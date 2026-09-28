import { spawn } from 'child_process';
import fs from 'fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userDataDir = 'C:\\Users\\ragha\\.gemini\\antigravity\\scratch\\upsssc-pet-master\\.tmp_test_live';

const edge = spawn(edgePath, [
  '--headless=new',
  '--remote-debugging-port=9245',
  `--user-data-dir=${userDataDir}`,
  '--disable-gpu'
]);

setTimeout(async () => {
  try {
    const p = await fetch('http://127.0.0.1:9245/json/new?about:blank', { method: 'PUT' }).then((r) => r.json());
    const ws = new WebSocket(p.webSocketDebuggerUrl);
    await new Promise((r) => ws.addEventListener('open', r));

    let mid = 1;
    const send = (m, params = {}) =>
      new Promise((res) => {
        const id = mid++;
        const onm = (e) => {
          const d = JSON.parse(e.data);
          if (d.id === id) {
            ws.removeEventListener('message', onm);
            res(d.result);
          }
        };
        ws.addEventListener('message', onm);
        ws.send(JSON.stringify({ id, method: m, params }));
      });

    ws.addEventListener('message', (e) => {
      const d = JSON.parse(e.data);
      if (d.method === 'Runtime.consoleAPICalled') {
        console.log('[BROWSER CONSOLE]', d.params.type, d.params.args.map((a) => a.value || a.description).join(' '));
      }
      if (d.method === 'Runtime.exceptionThrown') {
        console.error('[BROWSER EXCEPTION]', d.params.exceptionDetails);
      }
    });

    await send('Runtime.enable');
    await send('Page.navigate', { url: 'https://raghavendra-exp.github.io/upsssc-pet-master/' });
    await new Promise((r) => setTimeout(r, 4000));

    const res = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        title: document.title,
        rootChildren: document.getElementById('root')?.children.length,
        rootHtmlLength: document.getElementById('root')?.innerHTML.length,
        headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.innerText).slice(0, 5),
        sampleText: document.body.innerText.substring(0, 300)
      })`,
      returnByValue: true
    });

    console.log('LIVE SITE EVALUATION RESULTS:');
    console.log(JSON.parse(res.result.value));

    // Capture screenshot of live site
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(
      'C:\\Users\\ragha\\.gemini\\antigravity\\brain\\a0eef35a-5704-4886-81bc-a10654646912\\live_site_verified.png',
      Buffer.from(shot.data, 'base64')
    );
    console.log('Live site screenshot successfully saved to artifacts!');

    ws.close();
  } catch (err) {
    console.error('Error during live check:', err);
  } finally {
    edge.kill();
    fs.rmSync(userDataDir, { recursive: true, force: true });
    process.exit(0);
  }
}, 2000);
