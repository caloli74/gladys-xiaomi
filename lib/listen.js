/* daemon to listen messages sent by the gateway */
var shared = require('./shared.js');
var Xiaomi = require('./Xiaomi.js');

module.exports = function listen() {
    let active = 0;
    if (active) {
        shared.xiaomi = new Xiaomi("wkj8q0gi2nmaugth");
        shared.xiaomi.on('ready', () => {
            console.log('Started !! Devices = ' + JSON.stringify(shared.xiaomi.getDetails()));
        });
        shared.xiaomi.on('event', (data) => {
            //console.log('event = ' + JSON.stringify(data));
            //if (data.model === "button") console.log('xiaomi = ' + shared.xiaomi.ready + ' ' + shared.xiaomi._heartbeat + ' ' + shared.xiaomi._nbDevices + ' ' + shared.xiaomi._devicesRead);
            //if (data.model === "button") console.log('devices = ' + JSON.stringify(shared.xiaomi.getDetails()));
            //if (data.model === "button") shared.xiaomi.setColor({r:255, g:0, b:0}, 50);
            if (data.model === "button") shared.xiaomi.playSound(12, 10);
        });
    }
}