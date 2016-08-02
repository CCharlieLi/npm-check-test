'use strict';

const outdatedPackages = require('./get-outdated-info');
const installPackages = require('./install-packages');
const checkVersion = exports;

checkVersion.getOutdatedPackages = (options) => {
  return outdatedPackages.getOutdatedVersions(options).then((res) => {
    return res;
  });
};

checkVersion.updatePackages = (packages, options) => {
  // return installPackages.
};
