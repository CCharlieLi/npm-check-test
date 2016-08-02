'use strict';

const Promise = require('bluebird');
const npm = require('promisified-npm');
const PackageInfo = exports;

/**
 * Copied from David.js. @https://github.com/alanshaw/david/blob/master/lib/david.js#L13-L22
 * Determine if a version is a stable version or not.
 * @param {String} version
 * @return {Boolean}
 */
const isStable = (version) => {
  const unstablePattern = /[a-z+\-]/i;
  return !unstablePattern.test(version || '');
};

/**
 * Copied from David.js. @https://github.com/alanshaw/david/blob/master/lib/david.js#L42
 * Get the latest stable version from a list of versions in ascending order.
 * @param {Array} versions
 * @return {String}
 */
const getLatestStable = (versions) => {
  versions = versions.slice();
  while (versions.length) {
    const version = versions.pop();
    if (isStable(version)) {
      return version;
    }
  }
  return null;
};

/**
 * Get package info from NPM, use 'npm view'.
 * @param  {Array}  viewConfig Npm view script parameters. ['jscs', 'version', 'time']
 * @param  {Object} options [description]
 * @return {Object}         Packege info of giving node module.
 */
PackageInfo.getPackageInfo = (viewConfig, options) => {
  const view = viewConfig || ['jscs'];
  const npmConfig = options || {
    loglevel: 'silent'
  };

  // Load npm config
  return npm.loadAsync(npmConfig).then(() => {
    // Load view config, set true to shutdown stdout.
    return npm.commands.viewAsync(view, true).then((data) => {
      return data;
    });
  }).catch((err) => {
    throw Error('npm error');
  });
};

/**
 * Get latest version of giving node module.
 * @param  {String} packageName Node module name. 'jscs'
 * @param  {Object} options     [description]
 * @return {String}             Version string. '3.0.7'
 */
PackageInfo.getLatestVersion = (packageName, options) => {
  return this.getPackageInfo([packageName], options).then((res) => {
    return Object.keys(res)[0];
  });
};

PackageInfo.getLatestStableVersion = (packageName, options) => {
  return this.getPackageInfo([packageName, 'versions'], options).then((res) => {
    return getLatestStable(res[Object.keys(res)[0]].versions);
  });
};

