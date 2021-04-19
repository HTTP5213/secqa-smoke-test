const assert = require('assert'),
    chai = require("chai"),
    chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect,
    {axe} = require('./index.axe'),
    // vis = require('./index.visual-regression'),
    lght = require('./index.lighthouse'),
    val = require('./index.validate'),
    links = require('./index.links'),
    emailRequired = require('./index.emailRequired'),
    asrt = require('./index.consoleAssertions');

describe('index.html', function() {
    // describe('Responsiveness', function() {
    //     this.timeout(8000);
    //     it('should match existing screenshot for media viewport below 600px', async function() {
    //         return expect(await vis()).to.be.true;
    //     });
    // });
    describe('Lighthouse metrics', function() {
        this.timeout(8000);
        describe('Performance metrics', function() {
            it('should get a perfect score in lighthouse performance metrics', async function() {
                return expect(await lght.performance()).to.have.property('performance').to.equal(1);
            });
        });
        describe('Best practices metrics', function() {
            it('should get a perfect score in lighthouse best practices metrics', async function() {
                return expect(await lght.bestPractices()).to.have.property('best-practices').to.equal(1);
            });
        });
        describe('SEO metrics', function() {
            it('should get a perfect score in lighthouse SEO metrics', async function() {
                return expect(await lght.seo()).to.have.property('seo').to.equal(1);
            });
        });
    });
    describe('Accessibility', function() {
        it('should raise no accessibility issues in axe-core', async function() {
            return expect(Promise.resolve(ax())).to.eventually.have.property('violations').to.have.lengthOf(0);
        });
    });
    describe('HTML validation', function() {
        it('validates as HTML5 according to the W3C', async function() {
            return expect(await val()).to.have.lengthOf(0);
        });
    });
    describe('Link validation', function() {
        it('has no broken links', async function() {
            return expect(await links()).to.be.true;
        });
    });
    describe('Front-end form validation', function() {
        it('has an email input with the `required` attribute', async function() {
            return expect(await emailRequired()).to.be.true;
        });
    });
    describe('Errors and failed assertions', function() {
        it('has no page errors or failed assertions', async function() {
            return expect(await asrt()).to.have.lengthOf(0);
        });
    });
});