'use strict';

module.exports = function($allonsy, $index, $done) {
  var express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      compression = require('compression'),
      cookieParser = require('cookie-parser');

  require(path.resolve(__dirname, 'express-bootstrap-server.js'))($allonsy, function() {
    var server = express();

    DependencyInjection.service('$express', [function() {
      return express;
    }]);

    DependencyInjection.service('$server', [function() {
      return server;
    }]);

    server.use(bodyParser.urlencoded({
      extended: true
    }));

    server.use(compression({
      filter: function(req, res) {
        return /json|text|xls|doc|pdf|javascript|image/.test(res.getHeader('Content-Type'));
      }
    }));

    server.use(cookieParser(process.env.EXPRESS_COOKIE_SECRET));

    server.set('port', parseInt(process.env.EXPRESS_PORT || 86, 10) + $index);

    var http = require('http').Server(server);

    DependencyInjection.service('$http', [function() {
      return http;
    }]);

    var expressFiles = $allonsy.findInFeaturesSync('*-express.js');

    expressFiles.forEach(function(file) {
      DependencyInjection.injector.controller.invoke(null, require(path.resolve(file)));
    });

    http.listen(server.get('port'), function() {
      $allonsy.logInfo('► SERVER (#' + $index + ') IS RUNNING ON :' + server.get('port') + '\n');
    });

    $done();
  });
};
