const puppeteer = require('puppeteer');
const axe = require('axe-core');
const express = require('express');
const app = express();
const port = 4322;

app.use(express.static('public'));

const server = app.listen(port, () => console.log(`AX Server listening on port: ${port}`));

module.exports = (async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:4322');

    await page.addScriptTag({
        path: require.resolve('axe-core')
    });

    const result = await page.evaluate(async () => {
        return await axe.run();
    });

    await page.close();
    await browser.close();
    server.close();
    
    return result;
})();