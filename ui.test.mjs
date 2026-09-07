// Playwright against the live site (or URL env). Needs epiphany's node_modules; Chrome channel, no download.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const { chromium } = createRequire('/Users/joshua/Documents/Code/epiphany/package.json')('playwright');
const URL = process.env.URL || 'https://fieldbook.heyitsmejosh.com';

test('page renders, search filters, mark read persists', async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(URL);
  const total = await page.locator('article').count();
  assert.ok(total >= 70, `articles: ${total}`);
  assert.equal(await page.locator('article svg.icon').count(), total, 'icon per article');
  await page.locator('#topology').scrollIntoViewIfNeeded(); await page.waitForTimeout(800);
  assert.ok(await page.locator('#topology.in').count(), 'scroll-in class applied');
  await page.fill('#q', 'kidney');
  const visible = await page.locator('article:not(.hidden)').count();
  assert.ok(visible > 0 && visible < total, `filtered: ${visible}`);
  await page.fill('#q', '');
  await page.locator('#calculus .mark').click();
  assert.equal(await page.locator('#calculus .mark').textContent(), 'Read');
  await page.reload();
  assert.equal(await page.locator('#calculus .mark').textContent(), 'Read');
  assert.match(await page.locator('#progress').textContent(), /^1 of \d+ read$/);
  await page.locator('nav a[data-id="topology"]').click();
  assert.ok(await page.locator('#topology').isVisible());
  await page.screenshot({ path: 'screenshots/desktop.png', fullPage: false });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'screenshots/mobile.png' });
  await browser.close();
});
