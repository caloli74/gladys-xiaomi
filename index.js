module.exports = function (sails) {
    var listen = require('./lib/listen.js');
    var install = require('./lib/install.js');
    var exec = require('./lib/exec.js');
    var setColor = require('./lib/setColor.js');
    var turnOff = require('./lib/turnOff.js');
    var playSound = require('./lib/playSound.js');

    gladys.on('ready', function(){
        listen();
    });

    return {
        install: install,
        exec: exec,
        setColor: setColor,
        turnOff: turnOff,
        playSound: playSound
    };
};