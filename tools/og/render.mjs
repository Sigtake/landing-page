// Renders every card in cards.json to og/*.png at 1200x630.
//
//   npm i --no-save playwright && npx playwright install chromium
//   node tools/og/render.mjs
//
// Nothing here runs at build or deploy time: the site stays a set of static files
// with no dependencies. Re-run it by hand whenever a headline in cards.json changes.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const ROOT = new URL('../../', import.meta.url).pathname;
const PORT = 8912;
const TYPES = { '.html': 'text/html', '.json': 'application/json', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png' };

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('playwright not found. Run:\n  npm i --no-save playwright && npx playwright install chromium');
  process.exit(1);
}

const server = createServer(async (req, res) => {
  const path = join(ROOT, normalize(decodeURI(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, ''));
  try {
    const body = await readFile(path);
    res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

const cards = JSON.parse(await readFile(new URL('cards.json', import.meta.url), 'utf8'));
const browser = await chromium.launch();
// deviceScaleFactor 2 then downscale: type and hairlines survive the resample.
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });

for (const [id, card] of Object.entries(cards)) {
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${PORT}/tools/og/template.html?card=${id}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.documentElement.dataset.ready === '1', null, { timeout: 10000 });
  if (errors.length) throw new Error(`${id}: ${errors.join(' | ')}`);
  await page.screenshot({ path: join(ROOT, card.out), scale: 'css' });
  await page.close();
  console.log(`${card.out}  ${card.titleHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()}`);
}

await browser.close();
server.close();
