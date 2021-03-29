const puppeteer = require("puppeteer");

module.exports = async function (context, req) {

    const url = req.query.url;
    
    if (!url)
    {
        context.res = {
            status: 200,
            body: "Missing URL Parameter"
        }
        return;
    }
    const browser = await puppeteer.launch({
        product: 'chrome',
        //executablePath: 'C:/home/site/wwwroot/node_modules/puppeteer/.local-chromium/win64-818858/chrome-win/chrome.exe',
        ignoreDefaultArgs: ['--disable-extensions'],
        headless: true,
        timeout: 100000
    });

    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle0'});

    const pdf = await page.pdf({format: 'Letter'});

    await browser.close();

    context.res = {
        status: 200,
        body: pdf,
        headers: {
            "content-type": "application/pdf"
        }
    };
}