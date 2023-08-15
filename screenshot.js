const puppeteer = require('puppeteer');

(async (message) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load the HTML page directly
  await page.goto(`file://${__dirname}/index.html`);

  // Wait for any additional resources to load
  await page.waitForTimeout(1000); // Adjust the timeout as needed

  // Replace the text in the quote element with the provided message
  await page.evaluate((message) => {
    const quoteElement = document.querySelector('#quote-holder');
    if (quoteElement) {
      quoteElement.textContent = message;
    }
  }, message);

  // Capture a screenshot of the modified card element
  const cardElement = await page.$('.card'); // Change the selector as needed
  if (cardElement) {
    await cardElement.screenshot({ path: 'screenshot.png' });
  }

  await browser.close();
})(process.argv[2]); // Get the message from the command line argument
