import express from 'express';
import puppeteer from 'puppeteer';
const app = express(),
    port = 4325;


export async function asrt() {
    app.use(express.static('public'));

    const server = app.listen(port, () => console.log(`AR Server listening on port: ${port}`));
    const url = 'http://localhost:' + port;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const resultArr = [];
    page.on('console', async e => {
        const args = await Promise.all(e.args().map(a => a.jsonValue()));
        console.log(args);
        if (e.type() === ('assert' || 'error')) {
            resultArr.push(e);
        }
    });
    page.on("pageerror", function(err) {
        resultArr.push(err);
    });
    await page.goto('http://localhost:' + port);
    await page.close();
    await browser.close();
    await server.close();
    return resultArr;
};