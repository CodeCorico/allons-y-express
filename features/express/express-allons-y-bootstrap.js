'use strict';

var path = require('path');

module.exports = {
  bootstrap: function($allonsy, $options, $done) {
    if ((!process.env.EXPRESS || process.env.EXPRESS == 'true') && $options.owner == 'start') {
      require(path.resolve(__dirname, 'express-service-back.js'))();

      var $ExpressService = DependencyInjection.injector.controller.get('$ExpressService');

      $allonsy.on('message', function(args) {
        if (args.event == 'update(express/server)') {
          $ExpressService.processServer(args.p, args.port);
        }
      });
    }

    $done();
  },
  liveCommands: [process.env.EXPRESS || process.env.EXPRESS == 'true' ? {
    commands: 'servers',
    description: 'output the servers infos',
    action: require(path.resolve(__dirname, 'express-live-commands.js'))
  } : null]
};

