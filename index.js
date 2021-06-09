const puppeteer = require('puppeteer');
const fs = require('fs/promises');

// Time in  seconds to wait on the page
const wait_time = 5;

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://google.com');
    await page.waitForTimeout(wait_time*1000);
    const cookie_dump = await fs.open("./output/cookies.json", 'w');
    const page_dump = await fs.open("./output/content.txt", 'w');
    // A specific command to chrome dev tool api.
    let cookies = await page._client.send('Network.getAllCookies');
    let page_content = await page.content();
    console.log(cookies);
    await cookie_dump.write(JSON.stringify(cookies.cookies));
    await page_dump.write(String(page_content));
    await browser.close();
  })();