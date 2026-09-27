/**
 * VIBE.STUDIO — Local LAN Development Server
 * Binds to 0.0.0.0:5500 for mobile testing on local Wi-Fi networks.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 5500;
const HOST = '0.0.0.0';

// MIME types mapping
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css':  'text/css; charset=UTF-8',
  '.js':   'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.pdf':  'application/pdf',
  '.webmanifest': 'application/manifest+json; charset=UTF-8',
  '.xml':  'application/xml; charset=UTF-8',
  '.txt':  'text/plain; charset=UTF-8'
};

// Detect primary private LAN IPv4 address
function getLanIPv4() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      // Skip internal (127.0.0.1) and non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        // Match standard private network subnets: 192.168.x.x, 10.x.x.x, 172.16-31.x.x
        if (
          net.address.startsWith('192.168.') ||
          net.address.startsWith('10.') ||
          /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(net.address)
        ) {
          return net.address;
        }
      }
    }
  }
  return '192.168.X.X';
}

const lanIP = getLanIPv4();

// HTTP Static File Server
const server = http.createServer((req, res) => {
  // Normalize URL path
  let safePath = path.normalize(req.url.split('?')[0]).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(__dirname, safePath);

  // Security check: prevent path traversal outside root
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const page404 = path.join(__dirname, '404.html');
      if (fs.existsSync(page404)) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        fs.createReadStream(page404).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end('<h1>404 Not Found</h1><p>The requested file was not found on VIBE.STUDIO LAN Server.</p>');
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // CORS & Cache control headers for local dev testing
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

// Start Server listening on 0.0.0.0:5500
server.listen(PORT, HOST, () => {
  console.log('\n================================================================');
  console.log('       VIBE.STUDIO — LOCAL WI-FI LAN DEVELOPMENT SERVER        ');
  console.log('================================================================\n');
  console.log(`  ► Computer Local Access : http://localhost:${PORT}`);
  console.log(`  ► Mobile Wi-Fi Access   : http://${lanIP}:${PORT}\n`);
  console.log('----------------------------------------------------------------');
  console.log('  MOBILE CONNECTIVITY INSTRUCTIONS:');
  console.log('  1. Connect your mobile phone to the SAME Wi-Fi network as this PC.');
  console.log(`  2. Open your phone browser and go to: http://${lanIP}:${PORT}`);
  console.log('  3. Web3Forms contact form will submit normally over LAN.');
  console.log('----------------------------------------------------------------');
  console.log('  WINDOWS FIREWALL CONFIGURATION (Private Networks Only):');
  console.log('  Run PowerShell as Administrator if connection times out:');
  console.log(`  netsh advfirewall firewall add rule name="VIBE.STUDIO Dev Port 5500" dir=in action=allow protocol=TCP localport=5500 profile=private\n`);
  console.log('  SECURITY NOTICE: Bound to 0.0.0.0 for LAN testing.');
  console.log('  Do NOT use on untrusted Public Wi-Fi. Production runs via Cloudflare CDN.');
  console.log('================================================================\n');
});
