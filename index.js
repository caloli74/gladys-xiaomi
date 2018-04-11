module.exports = function (sails) {
    var listen = require('./lib/listen.js');
    var install = require('./lib/install.js');

    gladys.on('ready', function(){
        listen();
    });

    return {
        install: install
    };
};