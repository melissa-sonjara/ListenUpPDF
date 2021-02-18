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