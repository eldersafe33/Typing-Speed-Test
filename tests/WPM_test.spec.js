const { test, expect } = require("@playwright/test");

test("Verify WPM calculation in typing speed test", async ({ page }) => {
  test.setTimeout(60000);

  await page.goto("file:///D:/aboba/TYPINGSPEEDTESTGITHUB/index.html");

  await page.click("#startBtn");

  const sentence = await page.locator("#displayText").textContent();
  console.log(`Typing Sentence: ${sentence.trim()}`);

  const inputBox = page.locator("#inputBox");
  const words = sentence.trim().split(" ");

  let currentIndex = 0;

  while (currentIndex < words.length) {
    const statsText = await page.locator(".stats").textContent();
    const timeMatch = statsText.match(/Time:\s*(\d+)\s*s/);
    const timeLeft = timeMatch ? parseInt(timeMatch[1]) : 0;

    if (timeLeft <= 0) break;

    await inputBox.type(words[currentIndex] + " ", { delay: 210 });

    currentIndex++;

    if (currentIndex === words.length) {
      console.log("Last word typed. Stopping the test.");
      break;
    }
  }

  const finalStats = await page.locator(".stats").textContent();
  const wpmMatch = finalStats.match(/WPM:\s*(\d+)/);
  const wpm = wpmMatch ? parseInt(wpmMatch[1]) : 0;

  console.log(`Final WPM: ${wpm}`);

  expect(wpm).toBeGreaterThan(0);

  await page.close();
});
