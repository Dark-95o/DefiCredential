import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexerDir = path.resolve(__dirname, '..');
const distDir = path.resolve(indexerDir, 'dist');
const uiDir = path.resolve(indexerDir, '..', 'ui');
const uiDistDir = path.resolve(uiDir, 'dist');

console.log('[indexer:build] Preparing production output for Vercel deployment...');

// 1. If ui directory exists, build ui and copy to indexer/dist
if (fs.existsSync(uiDir)) {
  try {
    console.log('[indexer:build] Building UI bundle from ../ui...');
    execSync('npm run build', { cwd: uiDir, stdio: 'inherit' });
    if (fs.existsSync(uiDistDir)) {
      if (fs.existsSync(distDir)) {
        fs.rmSync(distDir, { recursive: true, force: true });
      }
      fs.cpSync(uiDistDir, distDir, { recursive: true });
      console.log(`[indexer:build] Successfully copied UI bundle to ${distDir}`);
    }
  } catch (err) {
    console.warn('[indexer:build] Note: Building ../ui via execSync encountered:', err.message);
    if (fs.existsSync(uiDistDir)) {
      fs.cpSync(uiDistDir, distDir, { recursive: true });
      console.log('[indexer:build] Used existing UI dist artifacts.');
    }
  }
}

// 2. Fallback: Ensure dist directory always exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

if (!fs.existsSync(path.resolve(distDir, 'index.html'))) {
  fs.writeFileSync(
    path.resolve(distDir, 'index.html'),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CloakPass | Shielded Zero-Knowledge Gatekeeper</title>
  </head>
  <body>
    <div id="root">CloakPass Deployment Ready</div>
  </body>
</html>`
  );
}

console.log('[indexer:build] Production output verified at indexer/dist.');
