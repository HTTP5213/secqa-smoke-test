import express from 'express';
import puppeteer from 'puppeteer';
import axe from 'axe-core';

const app = express();
const port = 4322;

export async function ax() {
    app.use(express.static('public'));
    const server = app.listen(port, () => console.log(`AX Server listening on port: ${port}`));
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:' + port);

    await page.addScriptTag({
        path: 'node_modules/axe-core/axe.min.js'
    });

    const result = await page.evaluate(async () => {
        return await axe.run();
    });

    await page.close();
    await browser.close();
    await server.close();

    return result;
}