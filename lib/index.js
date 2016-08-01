'use strict';

const CheckProcess = require('./get-unused-package');
const InstalledPackages = require('./get-installed-packages');
const PackageInfo = require('./get-package-info');
const OutdatedPackages = require('./get-outdated-info');
const CheckPackageJson = require('./check-current-package');
const CheckVersion = require('./check-version');
const InstallPackages = require('./install-packages');
const ncTest = exports;

ncTest.check = (options) => {
  // Parse options
  const settings = options || {};
  return CheckProcess.getResult(settings).then((res) => {
    // consolr.log(res);
  });
};

exports.CheckProcess = CheckProcess;
exports.InstalledPackages = InstalledPackages;
exports.PackageInfo = PackageInfo;
exports.OutdatedPackages = OutdatedPackages;
exports.CheckPackageJson = CheckPackageJson;
exports.CheckVersion = CheckVersion;
exports.InstallPackages = InstallPackages;
