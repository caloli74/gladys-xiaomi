/* daemon to listen messages sent by the gateway */
var Xiaomi = require('./Xiaomi.js');

module.exports = function listen() {
    gladys.param.getValue('Xiaomi_password')
        .then((password) => {
            var xiaomi = new Xiaomi(password);
            xiaomi.on('ready', _onReady());
            xiaomi.on('event', _onEvent());
        });

    function _onReady() {
        console.log('Started !! Devices = ' + JSON.stringify(xiaomi.getDetails()));
    }

    function _onEvent() {
        console.log('event = ' + JSON.stringify(data));
        //if (data.model === "switch") console.log('xiaomi = ' + xiaomi.ready + ' ' + xiaomi._heartbeat + ' ' + xiaomi._nbDevices + ' ' + xiaomi._devicesRead);
        //if (data.model === "switch") console.log('devices = ' + JSON.stringify(xiaomi.getDetails()));
        //if (data.model === "switch") xiaomi.setColor({r:255, g:0, b:0}, 50);
        //if (data.model === "switch") xiaomi.playSound(12, 10);
    }
}