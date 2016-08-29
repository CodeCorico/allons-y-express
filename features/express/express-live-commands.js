'use strict';

module.exports = function($allonsy) {
  $allonsy.outputInfo('\n► servers:\n\n');

  var path = require('path');

  require(path.resolve(__dirname, 'express-service-back.js'))();

  var $ExpressService = DependencyInjection.injector.controller.get('$ExpressService'),
      child = $allonsy.childByName('Allons-y Express');

  if (!child || !child.processes || !child.processes.length) {
    $allonsy.outputInfo('  No Express server started\n');
  }

  child.processes.forEach(function(p) {
    var serverData = $ExpressService.processServer(p) || {
      port: '?',
      url: '?'
    };

    console.log('  ∙ [' + $allonsy.textInfo(p.name) + ' #' + p.id + ']: ' + $allonsy.textWarning(serverData.url));
  });

  console.log('');
};