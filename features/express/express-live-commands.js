'use strict';

module.exports = function($allonsy) {
  $allonsy.outputInfo('\n► servers:\n');

  var path = require('path');

  require(path.resolve(__dirname, 'models/express-service-back.js'))();

  var $ExpressService = DependencyInjection.injector.controller.get('$ExpressService'),
      child = $allonsy.childByName('Allons-y Express');

  if (!child || !child.processes || !child.processes.length) {
    $allonsy.outputInfo('  No Express server started');
  }

  child.processes.forEach(function(p) {
    var serverData = $ExpressService.processServer(p) || {
      port: '?',
      url: '?'
    };

    $allonsy.output('  ∙ [' + $allonsy.textInfo(p.name) + ' #' + p.id + ']: ' + $allonsy.textWarning(serverData.url), '\n');
  });
};
