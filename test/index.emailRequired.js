import { JSDOM } from 'jsdom';

export async function emailRequired() {
    const dom = await JSDOM.fromFile("./public/index.html", {});
    const emailInput = dom.window.document.getElementById('email');
    return emailInput.required;
};