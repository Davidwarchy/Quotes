const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load the HTML page directly
  await page.goto(`file://${__dirname}/index.html`);

  // Wait for any additional resources to load
  await page.waitForTimeout(1000); // Adjust the timeout as needed

  // Capture a screenshot of the card element
  const cardElement = await page.$('.card'); // Change the selector as needed
  if (cardElement) {
    await cardElement.screenshot({ path: 'screenshot.png' });
  }

  await browser.close();
})();
