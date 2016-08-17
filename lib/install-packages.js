'use strict';

const Promise = require('bluebird');
const npm = require('promisified-npm');
const InstallPackages = exports;

/**
 * Install package
 * @param  {String} installConfig Npm install script parameters. ['jscs@3.0.0', 'bluebird@2.9.0']
 * @param  {Object} options  [description]
 * @return {Boolean}          Install successfully or not
 */
InstallPackages.install = (installConfig, options) => {
  const install = installConfig || [''];
  const npmConfig = options || {
    loglevel: 'silent'
  };

  // Load npm config
  return npm.loadAsync(npmConfig).then(() => {
    // Load install config, set true to shutdown stdout.
    return npm.commands.installAsync('.', installConfig).then((data) => {
      if (Object.keys(data).length > 0) {
        return true;
      }
      return false;
    });
  }).catch((err) => {
    // TODO
    console.log(err);
    throw Error('npm error');
  });
};

InstallPackages.installAll = (packages, options) => {
  return Promise.all(packages.map((pkg) => {
    return this.install([pkg], options);
  })).then((res) => {

  });
};
