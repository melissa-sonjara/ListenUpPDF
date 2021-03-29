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
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        timeout: 100000
    });

    const page = await browser.newPage();
 
    await page.setViewport({width: 1440, height: 900, deviceScaleFactor: 2});
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    const png = await page.screenshot({ fullPage: true });
    await browser.close();

    context.res = {
        status: 200,
        body: png,
        headers: {
            "content-type": "image/png"
        }
    };
}