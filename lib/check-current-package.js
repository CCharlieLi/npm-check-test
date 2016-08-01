'use strict';

const currentPackage = require('./get-installed-packages');
const packageJson = exports;

const isExact = (deps) => {
  return !Object.keys(deps).some((key) => {
    if (deps[key].indexOf('^') > -1 ||
      deps[key].indexOf('~') > -1) {
      return true;
    }
  });
};

packageJson.checkExact = (options) => {
  options = options || {};
  const dep = options.dependencies || true;
  const depDev = options.devDependencies || true;

  return currentPackage.getPackageInfo().then((res) => {
    let result;
    if (dep) {
      result = isExact(res._dependencies);
    }
    if (depDev) {
      result = result === false ? false : isExact(res.devDependencies);
    }
    return result;
  });
};

packageJson.rewriteExact = () => {

};
