const { chromium } = require("playwright-chromium");

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
    const browser = await chromium.launch();

    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle'});

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