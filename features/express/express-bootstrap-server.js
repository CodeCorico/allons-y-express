'use strict';

module.exports = function($allonsy, callback) {

  var path = require('path'),
      async = require('async');

  async.mapSeries($allonsy.findInFeaturesSync('*-express-bootstrap.js'), function(file, nextFile) {

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
