'use strict';

const outdatedPackages = require('./get-outdated-info');
const checkVersion = exports;

checkVersion.getOutdatedPackages = (options) => {
  return outdatedPackages.getOutdatedVersions(options).then((res) => {
    console.log(res);
    return res;
  });
};

checkVersion.updatePackages = (options) => {

};
