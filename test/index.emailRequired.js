const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = (async () => {

    const dom = await JSDOM.fromFile("./public/index.html", {});

    const emailInput = dom.window.document.getElementById('email');
    return emailInput.required;
})();