const puppeteer = require('puppeteer'),
    lighthouse = require('lighthouse'),
    { URL } = require('url'),
    express = require('express'),
    app = express(),
    port = 4321;

app.use(express.static('public'));

const server = app.listen(port, () => console.log(`LH Server listening on port: ${port}`));

module.exports = (async () => {
    const url = 'http://localhost:' + port;
    const browser = await puppeteer.launch();

    const { lhr } = await lighthouse(url, {
        port: (new URL(browser.wsEndpoint())).port,
        output: 'json',
        onlyCategories: ['performance', 'seo', 'best-practices']
    });

    const structuredResultObj = {};

    const structuredResult = Object.keys(lhr.categories).forEach(cat => {
        structuredResultObj[cat] = lhr.categories[cat].score;
    });

    await browser.close();
    server.close();
    return structuredResultObj;
})();