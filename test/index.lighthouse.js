// wait, so do we need puppeteer?
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const { URL } = require('url');
const express = require('express');
const app = express();
const port = 4321;

app.use(express.static('public'));

const server = app.listen(port, () => console.log(`LH Server listening on port: ${port}`));

module.exports = (async () => {
    const url = 'http://localhost:4321';
    const browser = await puppeteer.launch();

    const { lhr } = await lighthouse(url, {
        port: (new URL(browser.wsEndpoint())).port,
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices']
    });

    // const result = Object.values(lhr.categories).map(c => c.score).join(', ');

    const structuredResultObj = {};

    const structuredResult = Object.keys(lhr.categories).forEach(cat => {
        structuredResultObj[cat] = lhr.categories[cat].score;
    });

    await browser.close();
    server.close();
    return structuredResultObj;
})();