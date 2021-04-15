const assert = require('assert'),
    chai = require("chai"),
    chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect,
    axe = require('./index.axe');
vis = require('./index.visual-regression.test'),
    lght = require('./index.lighthouse'),
    val = require('./index.validate'),
    links = require('./index.links'),
    emailRequired = require('./index.emailRequired');

beforeEach(async function() {
    await vis;
    await lght;
    await axe;
    await val;
    await links;
    await emailRequired;
});

it('Responsiveness', async function() {
    return expect(vis).to.eventually.be.true;
});

it('lighthouse performance', async function() {
    return expect(Promise.resolve(lght)).to.eventually.have.property('performance').to.equal(1);
});

it('lighthouse accessibility', async function() {
    return expect(Promise.resolve(lght)).to.eventually.have.property('accessibility').to.equal(1);
});

it('lighthouse best practices', async function() {
    return expect(Promise.resolve(lght)).to.eventually.have.property('best-practices').to.equal(1);
});

it('lighthouse SEO', async function() {
    return expect(Promise.resolve(lght)).to.eventually.have.property('seo').to.equal(1);
});

it('aXe', async function() {
    return expect(Promise.resolve(axe)).to.eventually.have.property('violations').to.have.lengthOf(0);
});

it('validates', async function() {
    return expect(Promise.resolve(val)).to.eventually.have.lengthOf(0);
});

it('has no broken links', async function() {
    return expect(Promise.resolve(links)).to.eventually.be.true;
})

it('has an email input with the `required` attribute', async function() {
    return expect(Promise.resolve(emailRequired)).to.eventually.be.true;
})