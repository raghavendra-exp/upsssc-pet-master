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
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const userDataDir = path.join(__dirname, '..', '.tmp_theme_capture');

  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9247',
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu'
  ]);

  await new Promise((r) => setTimeout(r, 1800));

  try {
    const newPage = await fetch('http://127.0.0.1:9247/json/new?about:blank', { method: 'PUT' }).then((r) => r.json());
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

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Network.enable');
    await send('Network.setCacheDisabled', { cacheDisabled: true });

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 2,
      mobile: false
    });

    await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
    await new Promise((r) => setTimeout(r, 2000));

    // Capture Light Mode Screenshot
    const shotLight = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(
      'C:\\Users\\ragha\\.gemini\\antigravity\\brain\\a0eef35a-5704-4886-81bc-a10654646912\\theme_light_verified.png',
      Buffer.from(shotLight.data, 'base64')
    );
    console.log('Light mode screenshot saved!');

    // Click Theme Toggle Button
    const clickRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('button[aria-label="Toggle Theme"]');
        if (btn) {
          btn.click();
          return 'SUCCESS: Clicked theme toggle button';
        }
        return 'FAILED: Theme toggle button not found';
      })()`,
      returnByValue: true
    });
    console.log('Toggle Action:', clickRes.result.value);

    await new Promise((r) => setTimeout(r, 1200));

    const darkStats = await send('Runtime.evaluate', {
      expression: `(() => ({
        htmlClasses: document.documentElement.className,
        themeAttr: document.documentElement.getAttribute('data-theme'),
        themeStorage: localStorage.getItem('upsssc_pet_theme_v1'),
        bgColor: window.getComputedStyle(document.body).backgroundColor
      }))()`,
      returnByValue: true
    });
    console.log('Dark Mode Status:', darkStats.result.value);

    // Capture Dark Mode Screenshot
    const shotDark = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(
      'C:\\Users\\ragha\\.gemini\\antigravity\\brain\\a0eef35a-5704-4886-81bc-a10654646912\\theme_dark_verified.png',
      Buffer.from(shotDark.data, 'base64')
    );
    console.log('Dark mode screenshot saved!');

    ws.close();
  } catch (err) {
    console.error('Error during theme capture:', err);
  } finally {
    edge.kill();
    server.close();
    process.exit(0);
  }
});
