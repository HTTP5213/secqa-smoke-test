const assert = require('assert'),
    chai = require("chai"),
    chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect,
    vis = require('./index.visual-regression.test');

beforeEach(async function() {
  await vis;
});

it('Responsiveness', async function() {
    return expect(vis).to.eventually.be.true;
});