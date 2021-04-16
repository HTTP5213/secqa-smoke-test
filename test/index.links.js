const fet = require('node-fetch'),
    jsdom = require("jsdom"),
    { JSDOM } = jsdom;

module.exports = (async () => {
    const responseArray = [];
    const dom = await JSDOM.fromFile("./public/index.html", {});

    const anchors = dom.window.document.querySelectorAll('a');

    for await (const anchor of anchors) {
        const aObj = {
            href: anchor.href
        };

        const getData = async (url) => {
            try {
                const response = await fet(url);
                const res = await response;
                aObj.statusCode = res.status;
            } catch (error) {
                aObj.statusCode = error.message;
            }
        };

        await getData(anchor.href);
        responseArray.push(aObj);
    }
    const noBrokenLinks = responseArray.every(resp => resp.statusCode < 400);

    return noBrokenLinks;
})();