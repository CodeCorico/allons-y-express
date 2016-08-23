'use strict';

module.exports = function($allonsy, callback) {

  var path = require('path'),
      async = require('async');

  $allonsy.log('allons-y-express', 'express-bootstrap-start');

  async.mapSeries($allonsy.findInFeaturesSync('*-express-bootstrap.js'), function(file, nextFile) {

    $allonsy.log('allons-y-express', 'express-bootstrap-exec:' + file);

    DependencyInjection.injector.controller.invoke(null, require(path.resolve(file)), {
      controller: {
        $done: function() {
          return nextFile;
        }
      }
    });

  }, function(err) {
    if (err) {
      throw err;
    }

    callback();
  });

};
