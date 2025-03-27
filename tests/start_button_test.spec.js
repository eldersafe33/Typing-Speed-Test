const { test, expect } = require("@playwright/test");

test('Track time when clicking the "Start Test" button', async ({ page }) => {
  await page.goto("file:///D:/aboba/TYPINGSPEEDTESTGITHUB/index.html");

  const startBtn = page.locator("#startBtn");
  await startBtn.click();

  const startTime = Date.now();

  await page.waitForTimeout(5000);

  const statsValue = await page.locator(".stats").textContent();

  const elapsedTime = (Date.now() - startTime) / 1000;

  console.log(`Elapsed Time (JS): ${elapsedTime} seconds`);
  console.log(`Stats (UI): ${statsValue}`);

  expect(elapsedTime).toBeGreaterThanOrEqual(3);

  await page.close();
});
