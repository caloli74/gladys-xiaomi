module.exports = function (sails) {
    var shared = require('./lib/shared.js');
    var listen = require('./lib/listen.js');
    var install = require('./lib/install.js');
    var exec = require('./lib/exec.js');
    function setColor() {shared.xiaomi.setColor(color, intensity)};

    gladys.on('ready', function(){
        listen();
    });

    return {
        install: install,
        exec: exec,
        setColor: setColor
//        playSound: shared.xiaomi.playSound(sound, volume),
//        setColor: shared.xiaomi.setColor(color, intensity)
    };
};