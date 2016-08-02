'use strict';

const lib = require('../lib');
const chai = require('chai');
const should = chai.should();

describe('Check packages version', () => {
  it('should return oudated info', (done) => {
    lib.CheckVersion.getOutdatedPackages().then((res) => {
      res.length.should.be.above(0);
      done();
    }, done);
  });
});
