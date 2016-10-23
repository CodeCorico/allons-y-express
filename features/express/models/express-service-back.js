module.exports = function() {
  'use strict';

  DependencyInjection.service('$ExpressService', function() {

    return new (function $ExpressService() {

      var _processes = {};

      this.processServer = function(p, port) {
        if (typeof port == 'undefined') {
          return _processes[p.id];
        }

        var index = p.id.split('.')[1];

        _processes[p.id] = _processes[p.id] || {};
        _processes[p.id].port = port;
        _processes[p.id].url = process.env.EXPRESS_URL
          .replace(/{port}/g, port)
          .replace(/{index}/g, index);

        return _processes[p.id];
      };

    })();
  });

};
