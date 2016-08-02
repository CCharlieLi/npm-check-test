'use strict';

const Promise = require('bluebird');
const npm = require('promisified-npm');
const InstalledPackage = exports;

/**
 * Get package info of current project.
 * @param  {String} lsConfig Npm ls script parameters. 'jscs'
 * @param  {Object} options  [description]
 * @return {Object}         Packege info of current node module.
 */
InstalledPackage.getPackageInfo = (lsConfig, options) => {
  const ls = lsConfig || '';
  const npmConfig = options || {
    loglevel: 'silent'
  };

  // Load npm config
  return npm.loadAsync(npmConfig).then(() => {
    // Load ls config, set true to shutdown stdout.
    return npm.commands.lsAsync(ls, true).then((data) => {
      return data;
    });
  }).catch((err) => {
    // TODO
    throw Error('npm error');
  });

};

/**
 * Get package info of all installed node modules.
 * @param  {Object} options [description]
 * @return {Object}         Package info of all installed node modules.
 */
InstalledPackage.getAllPackages = (options) => {
  return this.getPackageInfo('', options).then((res) => {
    return res.dependencies;
  });
};

/**
 * Get versions of all installed node modules.
 * @param  {Object} options [description]
 * @return {Array}          Array of {module: version}
 */
InstalledPackage.getAllVersions = (options) => {
  return this.getAllPackages(options).then((res) => {
    return Object.keys(res).map((name) => {
      return { [name]: res[name].version };
    });
  });
};
