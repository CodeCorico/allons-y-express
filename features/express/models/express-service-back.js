module.exports = function() {
  'use strict';

  DependencyInjection.service('$ExpressService', function() {

    return new (function $ExpressService() {

      var _processes = {};

      this.processServer = function(p, port) {
        if (typeof port == 'undefined') {
          return _processes[p.id];
        }

        _processes[p.id] = _processes[p.id] || {};
        _processes[p.id].port = port;
        _processes[p.id].url = (process.env.EXPRESS_URL || '') + ':' + port;

        return _processes[p.id];
      };

    })();
  });

};
