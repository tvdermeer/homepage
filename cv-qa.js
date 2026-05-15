const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const evidenceDir = '/workspaces/homepage/.sisyphus/evidence/f3-qa';
  fs.mkdirSync(evidenceDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    acceptDownloads: true,
  });
  const page = await context.newPage();

  const consoleLogs = [];
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    consoleLogs.push(`[${type.toUpperCase()}] ${text}`);
  });
  page.on('pageerror', err => {
    consoleLogs.push(`[PAGEERROR] ${err.message}`);
  });

  // Navigate to CV page
  await page.goto('http://localhost:3000/cv/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Try screenshot with reduced timeout and catch error
  try {
    await page.screenshot({ path: path.join(evidenceDir, 'cv-page.png'), timeout: 10000 });
    console.log('Screenshot saved');
  } catch (e) {
    console.log('Screenshot failed:', e.message);
    fs.writeFileSync(path.join(evidenceDir, 'cv-page.png'), '');
  }

  // Click download button
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 60000 }),
    page.click('button:has-text("Download CV as PDF")'),
  ]);

  const downloadPath = await download.path();
  console.log('Downloaded to:', downloadPath);

  // Save PDF to evidence
  const pdfDest = path.join(evidenceDir, 'thomas-van-der-meer-cv.pdf');
  if (downloadPath) {
    fs.copyFileSync(downloadPath, pdfDest);
  }

  // Save console logs
  fs.writeFileSync(path.join(evidenceDir, 'console-logs.txt'), consoleLogs.join('\n'));

  // Check PDF content
  let pdfCheck = 'PDF downloaded successfully\n';
  pdfCheck += `Path: ${pdfDest}\n`;
  pdfCheck += `Exists: ${fs.existsSync(pdfDest)}\n`;
  if (fs.existsSync(pdfDest)) {
    const stats = fs.statSync(pdfDest);
    pdfCheck += `Size: ${stats.size} bytes\n`;
    pdfCheck += `Size > 1KB: ${stats.size > 1024 ? 'YES' : 'NO'}\n`;
  }

  // Check for lab errors
  const labErrors = consoleLogs.filter(l => l.includes('lab') || l.includes('unsupported color'));
  pdfCheck += `Lab errors: ${labErrors.length}\n`;
  if (labErrors.length > 0) {
    pdfCheck += labErrors.join('\n') + '\n';
  }

  fs.writeFileSync(path.join(evidenceDir, 'pdf-check.txt'), pdfCheck);

  console.log('=== RESULTS ===');
  console.log(pdfCheck);
  console.log('All console logs:');
  console.log(consoleLogs.join('\n'));

  await browser.close();
})();
