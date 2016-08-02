'use strict';

const Promise = require('bluebird');
const npm = require('promisified-npm');
const outdatedPackage = exports;

/**
 * Get outdated package info in current project.
 * @param  {String} lsConfig Npm ls script parameters. 'jscs'
 * @param  {Object} options  [description]
 * @return {Object}         Packege info of current node module.
 */
outdatedPackage.getOutdatedInfo = (outConfig, options) => {
  const out = outConfig || '';
  const npmConfig = options || {
    loglevel: 'silent',
    depth: 0
  };

  // Load npm config
  return npm.loadAsync(npmConfig).then(() => {
    // Load outdated config, set true to shutdown stdout.
    return npm.commands.outdatedAsync(out, true).then((data) => {
      return data;
    });
  }).catch((err) => {
    // TODO
    throw Error('npm error');
  });
};

/**
 * Get all outdated packages versions
 * @param  {Object} options [description]
 * @return {Array}         Array of outdated modules' version info
 */
outdatedPackage.getOutdatedVersions = (options) => {
  return this.getOutdatedInfo(options).then((res) => {
    return res.map((pkg) => {
      return {
        name: pkg[1],
        current: pkg[2],
        wanted: pkg[3],
        latest: pkg[4],
        packageJson: pkg[5],
        location: pkg[7]
      };
    });
  });
};

