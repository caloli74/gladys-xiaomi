/* daemon to listen messages sent by the gateway */
var shared = require('./shared.js');
var Xiaomi = require('./Xiaomi.js');

module.exports = function listen() {
    gladys.param.getValue('Xiaomi_password')
        .then((password) => {
            shared.xiaomi = new Xiaomi(password);
            shared.xiaomi.on('ready', () => {
                console.log('Started !! Devices = ' + JSON.stringify(shared.xiaomi.getDetails()));
            });
            shared.xiaomi.on('event', (data) => {
                console.log('event = ' + JSON.stringify(data));
                //if (data.model === "switch") console.log('xiaomi = ' + shared.xiaomi.ready + ' ' + shared.xiaomi._heartbeat + ' ' + shared.xiaomi._nbDevices + ' ' + shared.xiaomi._devicesRead);
                //if (data.model === "switch") console.log('devices = ' + JSON.stringify(shared.xiaomi.getDetails()));
                //if (data.model === "switch") shared.xiaomi.setColor({r:255, g:0, b:0}, 50);
                //if (data.model === "switch") shared.xiaomi.playSound(12, 10);
            });
        })
        .catch((err) => {
            return reject(new Error(err));
        });

}