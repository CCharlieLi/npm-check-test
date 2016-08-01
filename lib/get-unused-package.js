'use strict';

const npmCheck = require('npm-check');

const CheckProcess = exports;

CheckProcess.getResult = (options) => {
  return npmCheck(options).then((currentState) => {
    return currentState;
  });
};
