'use strict';

const lib = require('../lib');
const chai = require('chai');
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Check package json', () => {
  it('should check current package json is exact or not', (done) => {
    lib.CheckPackageJson.checkExact().then((res) => {
      res.should.be.equal(false);
      done();
    }, done);
  });
});
