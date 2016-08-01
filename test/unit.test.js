'use strict';

const lib = require('../lib');
const chai = require('chai');
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Unit test', () => {
  context('Get package info from NPM', () => {
    it('should return package info', (done) => {
      lib.PackageInfo.getPackageInfo(['jscs']).then((res) => {
        Object.keys(res[Object.keys(res)[0]]).length.should.be.above(0);
        done();
      }, done);
    });

    it('should return latest version', (done) => {
      lib.PackageInfo.getLatestVersion('jscs').then((res) => {
        should.exist(res);
        done();
      }, done);
    });

    it('should return latest stable version', (done) => {
      lib.PackageInfo.getLatestStableVersion('jscs').then((res) => {
        should.exist(res);
        done();
      }, done);
    });
  });

  context('Get installed package info', () => {
    it('should return current package info', (done) => {
      lib.InstalledPackages.getPackageInfo().then((res) => {
        Object.keys(res[Object.keys(res)[0]]).length.should.be.equal(14);
        done();
      }, done);
    });

    it('should return all installed packages info', (done) => {
      lib.InstalledPackages.getAllPackages().then((res) => {
        Object.keys(res).length.should.be.above(0);
        done();
      }, done);
    });

    it('should return versions of all installed packages', (done) => {
      lib.InstalledPackages.getAllVersions().then((res) => {
        res.length.should.be.above(0);
        done();
      }, done);
    });
  });

  context('Get outdated package info', () => {
    it('should return outdated package info', (done) => {
      lib.OutdatedPackages.getOutdatedInfo().then((res) => {
        res.length.should.be.above(0);
        done();
      }, done);
    });

    it('should return outdated packages versions', (done) => {
      lib.OutdatedPackages.getOutdatedVersions().then((res) => {
        res.length.should.be.above(0);
        done();
      }, done);
    });
  });
});
