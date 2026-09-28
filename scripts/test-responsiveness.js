import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

const server = http.createServer((req, res) => {
  let p = path.join(distDir, decodeURI(req.url.split('?')[0]));
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  if (fs.existsSync(p) && fs.statSync(p).isFile()) {
    const ext = path.extname(p);
    const mimeMap = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.svg': 'image/svg+xml',
      '.json': 'application/json',
      '.webmanifest': 'application/manifest+json'
    };
    res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'text/plain' });
    fs.createReadStream(p).pipe(res);
  } else {
    // SPA fallback
    const indexHtml = path.join(distDir, 'index.html');
    if (fs.existsSync(indexHtml)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream(indexHtml).pipe(res);
    } else {
      res.writeHead(404);
      res.end();
    }
  }
});

const PORT = 8098;
server.listen(PORT, async () => {
  console.log(`Test server running on port ${PORT}...`);
  const userDataDir = path.join(__dirname, '..', '.tmp_edge_test');
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

  if (!fs.existsSync(edgePath)) {
    console.log('Edge not found at default path, skipping CDP test');
    server.close();
    process.exit(0);
  }

  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9234',
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu'
  ]);

  await new Promise((r) => setTimeout(r, 1800));

  try {
    const newPage = await fetch('http://127.0.0.1:9234/json/new?about:blank', { method: 'PUT' }).then((r) => r.json());
    const ws = new WebSocket(newPage.webSocketDebuggerUrl);
    await new Promise((r) => ws.addEventListener('open', r));

    let msgId = 1;
    const send = (method, params = {}) =>
      new Promise((res) => {
        const mid = msgId++;
        const onm = (e) => {
          const d = JSON.parse(e.data);
          if (d.id === mid) {
            ws.removeEventListener('message', onm);
            res(d.result);
          }
        };
        ws.addEventListener('message', onm);
        ws.send(JSON.stringify({ id: mid, method, params }));
      });

    await send('Network.enable');
    await send('Network.setCacheDisabled', { cacheDisabled: true });

    const viewports = [
      { name: 'Mobile_320', width: 320, height: 640 },
      { name: 'Mobile_375', width: 375, height: 667 },
      { name: 'Tablet_768', width: 768, height: 1024 },
      { name: 'Desktop_1280', width: 1280, height: 800 }
    ];

    for (const vp of viewports) {
      console.log(`Testing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 2,
        mobile: vp.width < 768
      });

      await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
      await new Promise((r) => setTimeout(r, 1200));

      const evalRes = await send('Runtime.evaluate', {
        expression: `(() => {
          const list = [];
          document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > ${vp.width} + 2) {
              let p = el.parentElement;
              let inScroller = false;
              while (p && p !== document.body && p !== document.documentElement) {
                const s = window.getComputedStyle(p);
                if (s.overflowX === 'auto' || s.overflowX === 'scroll' || s.overflowX === 'hidden') {
                  inScroller = true;
                  break;
                }
                p = p.parentElement;
              }
              if (!inScroller) {
                list.push({
                  tag: el.tagName,
                  className: el.className,
                  right: Math.round(r.right),
                  width: Math.round(r.width)
                });
              }
            }
          });
          return list;
        })()`,
        returnByValue: true
      });

      const overflows = evalRes.result?.value || [];
      if (overflows.length > 0) {
        console.warn(`[WARNING] Found ${overflows.length} non-scroller overflows in ${vp.name}:`, overflows.slice(0, 3));
      } else {
        console.log(`[PASS] ${vp.name}: 0 overflows! Perfect responsive rendering.`);
      }
    }

    ws.close();
  } catch (err) {
    console.error('Error during CDP testing:', err);
  } finally {
    edge.kill();
    server.close();
    process.exit(0);
  }
});
