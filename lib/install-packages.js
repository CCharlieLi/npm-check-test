'use strict';

const Promise = require('bluebird');
const npm = require('npm-as-promised').default;
const InstallPackages = exports;

/**
 * Install packages
 * @param  {String} installConfig Npm install script parameters. ['jscs', 'bluebird']
 * @param  {Object} options  [description]
 * @return {Object}          [description]
 */
InstallPackages.install = (installConfig, options) => {
  const install = installConfig || [''];
  const npmConfig = options || {
    loglevel: 'silent'
  };

  // Load npm config
  return npm.load(npmConfig).then(() => {
    // Load install config, set true to shutdown stdout.
    return npm.commands.install(['webpack']).then((data) => {
      console.log(111, data);
      return data;
    });
  }).catch((err) => {
    // TODO
    console.log(err);
    throw Error('npm error');
  });

};
