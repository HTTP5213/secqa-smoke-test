const assert = require('assert'),
    chai = require("chai"),
    chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect,
    axe = require('./index.axe'),
    vis = require('./index.visual-regression'),
    lght = require('./index.lighthouse'),
    val = require('./index.validate'),
    links = require('./index.links'),
    emailRequired = require('./index.emailRequired'),
    asrt = require('./index.consoleAssertions');

beforeEach(async function() {
    await vis;
    await lght;
    await axe;
    await val;
    await links;
    await emailRequired;
    await asrt;
});

describe('index.html', function() {
    describe('Responsiveness', function() {
        it('should match existing screenshot for media viewport below 600px', async function() {
            return expect(vis).to.eventually.be.true;
        });
    });
    describe('Lighthouse metrics', function() {
        describe('Performance metrics', function() {
            it('should get a perfect score in lighthouse performance metrics', async function() {
                return expect(Promise.resolve(lght)).to.eventually.have.property('performance').to.equal(1);
            });
        });
        describe('Best practices metrics', function() {
            it('should get a perfect score in lighthouse best practices metrics', async function() {
                return expect(Promise.resolve(lght)).to.eventually.have.property('best-practices').to.equal(1);
            });
        });
        describe('SEO metrics', function() {
            it('should get a perfect score in lighthouse SEO metrics', async function() {
                return expect(Promise.resolve(lght)).to.eventually.have.property('seo').to.equal(1);
            });
        });
    });
    describe('Accessibility', function() {
        it('should raise no accessibility issues in axe-core', async function() {
            return expect(Promise.resolve(axe)).to.eventually.have.property('violations').to.have.lengthOf(0);
        });
    });
    describe('HTML validation', function() {
        it('validates as HTML5 according to the W3C', async function() {
            return expect(Promise.resolve(val)).to.eventually.have.lengthOf(0);
        });
    });
    describe('Link validation', function() {
        it('has no broken links', async function() {
            return expect(Promise.resolve(links)).to.eventually.be.true;
        });
    });
    describe('Front-end form validation', function() {
        it('has an email input with the `required` attribute', async function() {
            return expect(Promise.resolve(emailRequired)).to.eventually.be.true;
        });
    });
    describe('Errors and failed assertions', function() {
        it('has no page errors or failed assertions', async function() {
            return expect(Promise.resolve(asrt)).to.eventually.have.lengthOf(0);
        });
    });
});