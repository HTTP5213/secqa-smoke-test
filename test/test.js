import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
let expect = chai.expect;

import {ax} from './index.axe.js';
import * as lght from './index.lighthouse.js';
import {val} from './index.validate.js';
import {links} from './index.links.js';
import {emailRequired} from './index.emailRequired.js';
import {asrt} from './index.consoleAssertions.js';

describe('index.html', function() {
    describe('Lighthouse metrics', function() {
        this.timeout(60000);
        describe('Performance metrics', function() {
            it('should get a perfect score in lighthouse performance metrics', async function() {
                return expect(await lght.performance()).to.have.property('performance').to.be.above(.98);
            });
        });
        describe('Best practices metrics', function() {
            it('should get a perfect score in lighthouse best practices metrics', async function() {
                return expect(await lght.bestPractices()).to.have.property('best-practices').to.be.above(.98);
            });
        });
        describe('SEO metrics', function() {
            it('should get a perfect score in lighthouse SEO metrics', async function() {
                return expect(await lght.seo()).to.have.property('seo').to.be.above(.98);
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