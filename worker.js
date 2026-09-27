/**
 * VIBE.STUDIO — Cloudflare Edge Security Worker
 * Multi-Factor IP Risk Scoring, Rate-Limiting, Bot Defense & Security Logging
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Admin Security Log Endpoint (Protected)
    if (url.pathname === '/api/admin/security-log') {
      return handleAdminLogs(request, env);
    }

    // Only apply strict edge checks to POST form submissions and sensitive endpoints
    if (request.method !== 'POST' && !url.pathname.startsWith('/api/')) {
      return fetch(request);
    }

    // 2. Extract & Verify Visitor IP at Edge
    // CF-Connecting-IP is set authoritatively by Cloudflare edge servers.
    // Never trust client-supplied X-Forwarded-For headers.
    const clientIP = request.headers.get('CF-Connecting-IP') || '0.0.0.0';
    const userAgent = request.headers.get('User-Agent') || '';
    const cfThreat = request.cf?.threatScore || 0;
    const cfBotScore = request.cf?.botManagement?.score || 100;

    // Emergency Access Override (In case ISP reassigns public IP address)
    const emergencyToken = request.headers.get('X-Emergency-Access-Token') || url.searchParams.get('emergency_token');
    const isEmergencyAuth = emergencyToken && env.ADMIN_LOG_KEY && (emergencyToken === env.ADMIN_LOG_KEY);

    // Owner Public IP Allowlist (41.104.7.68 — Edge configuration only, never in frontend)
    const isOwnerIP = (clientIP === '41.104.7.68') || (env.OWNER_PUBLIC_IP && clientIP === env.OWNER_PUBLIC_IP);

    if (isOwnerIP || isEmergencyAuth) {
      // Clear any block if emergency token is provided
      const ipHash = await hashIP(clientIP);
      if (isEmergencyAuth && env.IP_LIMITS) {
        await env.IP_LIMITS.delete(`block:${ipHash}`);
      }
      return fetch(request);
    }

    // Mask / Hash IP for privacy-compliant logging (IPv4/IPv6 support)
    const ipHash = await hashIP(clientIP);

    // 3. Check for Active Temporary Block
    const blockKey = `block:${ipHash}`;
    const isBlocked = env.IP_LIMITS ? await env.IP_LIMITS.get(blockKey) : null;
    if (isBlocked) {
      await logSecurityEvent(env, {
        timestamp: new Date().toISOString(),
        ipHash,
        path: url.pathname,
        action: 'BLOCK',
        reason: 'Active temporary block enforced'
      });

      return new Response(
        JSON.stringify({
          success: false,
          message: 'Access temporarily restricted due to security policy. Please try again later.'
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '3600'
          }
        }
      );
    }

    // 4. Calculate Risk Score (0 - 100)
    let riskScore = 0;
    const riskReasons = [];

    // Rate Limiting (Requests per minute tracking)
    const minuteKey = `rate:${ipHash}:${Math.floor(Date.now() / 60000)}`;
    let currentCount = 0;
    if (env.IP_LIMITS) {
      const rawCount = await env.IP_LIMITS.get(minuteKey);
      currentCount = rawCount ? parseInt(rawCount, 10) : 0;
      await env.IP_LIMITS.put(minuteKey, (currentCount + 1).toString(), { expirationTtl: 120 });
    }

    if (currentCount >= 5) {
      riskScore += 35;
      riskReasons.push(`High request frequency (${currentCount} req/min)`);
    }

    // User-Agent Checks
    if (!userAgent || userAgent.trim().length < 10) {
      riskScore += 25;
      riskReasons.push('Missing or suspicious User-Agent');
    } else if (/(python|curl|wget|scrapy|httpclient|postman|insomnia|go-http-client)/i.test(userAgent)) {
      riskScore += 40;
      riskReasons.push('Automated script/client User-Agent detected');
    }

    // Cloudflare Threat Intelligence (if available)
    if (cfThreat > 10) {
      riskScore += Math.min(cfThreat, 30);
      riskReasons.push(`Cloudflare Threat Score: ${cfThreat}`);
    }
    if (cfBotScore < 30) {
      riskScore += 25;
      riskReasons.push(`Automated bot score: ${cfBotScore}`);
    }

    // Duplicate Request Body Hash Check (For POST form requests)
    if (request.method === 'POST') {
      const clonedReq = request.clone();
      const bodyText = await clonedReq.text().catch(() => '');
      if (bodyText.length > 0) {
        const bodyHash = await hashString(bodyText);
        const dupKey = `dup:${ipHash}:${bodyHash}`;
        if (env.IP_LIMITS) {
          const exists = await env.IP_LIMITS.get(dupKey);
          if (exists) {
            riskScore += 30;
            riskReasons.push('Duplicate payload submission within cooldown window');
          } else {
            await env.IP_LIMITS.put(dupKey, '1', { expirationTtl: 300 }); // 5 min cooldown
          }
        }
      }
    }

    // 5. Enforce Action Based on Risk Score

    // LOW RISK (< 40): Normal Visitor (e.g. Shared Wi-Fi) -> ALLOW
    if (riskScore < 40) {
      return fetch(request);
    }

    // MEDIUM RISK (40 - 79): Challenge Request (Managed Challenge)
    if (riskScore >= 40 && riskScore < 80) {
      await logSecurityEvent(env, {
        timestamp: new Date().toISOString(),
        ipHash,
        path: url.pathname,
        action: 'CHALLENGE',
        reason: riskReasons.join('; ')
      });

      return new Response(
        JSON.stringify({
          success: false,
          message: 'Verification required. Please complete the security challenge.',
          challengeRequired: true
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'cf-mitigate': 'challenge'
          }
        }
      );
    }

    // HIGH RISK (>= 80): Temporary Block (1-hour TTL auto-expiry)
    if (env.IP_LIMITS) {
      await env.IP_LIMITS.put(blockKey, '1', { expirationTtl: 3600 }); // 1 hour block
    }

    await logSecurityEvent(env, {
      timestamp: new Date().toISOString(),
      ipHash,
      path: url.pathname,
      action: 'BLOCK',
      reason: `High risk score (${riskScore}): ${riskReasons.join('; ')}`
    });

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Security policy restriction. Automated submission patterns detected.'
      }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

/**
 * Handle Admin Security Logs Retrieval
 * Auth: Requires X-Admin-Key matching env.ADMIN_LOG_KEY
 */
async function handleAdminLogs(request, env) {
  const authHeader = request.headers.get('X-Admin-Key') || '';
  if (!env.ADMIN_LOG_KEY || authHeader !== env.ADMIN_LOG_KEY) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const logsKey = 'logs:security_events';
  let logs = [];
  if (env.SECURITY_LOGS) {
    const raw = await env.SECURITY_LOGS.get(logsKey);
    logs = raw ? JSON.parse(raw) : [];
  }

  // Enforce 14-day retention limit on read
  const fourteenDaysAgo = Date.now() - (14 * 24 * 60 * 60 * 1000);
  const filteredLogs = logs.filter(log => new Date(log.timestamp).getTime() > fourteenDaysAgo);

  return new Response(
    JSON.stringify({
      count: filteredLogs.length,
      retentionPolicy: '14 Days Auto-Purge',
      events: filteredLogs
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}

/**
 * Log Security Event with 14-Day Automated Purge Window
 */
async function logSecurityEvent(env, event) {
  if (!env.SECURITY_LOGS) return;
  const logsKey = 'logs:security_events';
  try {
    const raw = await env.SECURITY_LOGS.get(logsKey);
    let logs = raw ? JSON.parse(raw) : [];

    // Append new event
    logs.unshift(event);

    // Retain max 500 recent items & purge > 14 days old
    const fourteenDaysAgo = Date.now() - (14 * 24 * 60 * 60 * 1000);
    logs = logs
      .filter(e => new Date(e.timestamp).getTime() > fourteenDaysAgo)
      .slice(0, 500);

    await env.SECURITY_LOGS.put(logsKey, JSON.stringify(logs), { expirationTtl: 14 * 86400 });
  } catch (err) {
    console.error('Logging failure:', err);
  }
}

/**
 * Anonymize / Mask IP with Salted SHA-256 Hash for Privacy Compliance
 */
async function hashIP(ip) {
  const salt = 'VIBE_STUDIO_SEC_SALT_2026';
  return hashString(ip + salt);
}

/**
 * Helper: SHA-256 Web Crypto Hash
 */
async function hashString(str) {
  const msgUint8 = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 24);
}
