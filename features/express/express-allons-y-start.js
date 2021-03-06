'use strict';

var path = require('path');

module.exports = {
  name: 'Allons-y Express',
  enabled: !process.env.EXPRESS || process.env.EXPRESS == 'true' || false,
  fork: true,
  forkCount: process.env.EXPRESS_COUNT && process.env.EXPRESS_COUNT == 'cpu' ?
    require('os').cpus().length :
    parseInt(process.env.EXPRESS_COUNT || 1, 10),
  forkMaxRestarts: parseInt(process.env.EXPRESS_RESTARTS || 1, 10),
  watch: '*-express.js',
  module: require(path.resolve(__dirname, 'express-server.js'))
};
