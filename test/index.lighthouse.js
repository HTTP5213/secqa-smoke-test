import express from 'express';
import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import { URL } from 'url';
const app = express();


export async function performance() {
    const port = 4321;
    app.use(express.static('public'));

    const server = app.listen(port, () => console.log(`LH Server listening on port: ${port}`));
    const url = 'http://localhost:' + port;
    const browser = await puppeteer.launch();

    const { lhr } = await lighthouse(url, {
        port: (new URL(browser.wsEndpoint())).port,
        output: 'json',
        onlyCategories: ['performance']
    });

    const structuredResultObj = {};

    const structuredResult = Object.keys(lhr.categories).forEach(cat => {
        structuredResultObj[cat] = lhr.categories[cat].score;
    });

    await browser.close();
    await server.close();
    return structuredResultObj;
};
    
export async function seo() {
    const port = 4320;
    app.use(express.static('public'));

    const server = app.listen(port, () => console.log(`LH Server listening on port: ${port}`));
    const url = 'http://localhost:' + port;
    const browser = await puppeteer.launch();

    const { lhr } = await lighthouse(url, {
        port: (new URL(browser.wsEndpoint())).port,
        output: 'json',
        onlyCategories: ['seo']
    });

    const structuredResultObj = {};

    const structuredResult = Object.keys(lhr.categories).forEach(cat => {
        structuredResultObj[cat] = lhr.categories[cat].score;
    });

    await browser.close();
    await server.close();
    return structuredResultObj;
};

export async function bestPractices() {
    const port = 4319;
    app.use(express.static('public'));

    const server = app.listen(port, () => console.log(`LH Server listening on port: ${port}`));
    const url = 'http://localhost:' + port;
    const browser = await puppeteer.launch();

    const { lhr } = await lighthouse(url, {
        port: (new URL(browser.wsEndpoint())).port,
        output: 'json',
        onlyCategories: ['best-practices']
    });
    
    const structuredResultObj = {};

    const structuredResult = Object.keys(lhr.categories).forEach(cat => {
        structuredResultObj[cat] = lhr.categories[cat].score;
    });

    await browser.close();
    await server.close();
    return structuredResultObj;
};