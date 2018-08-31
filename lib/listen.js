/* daemon to listen messages sent by the gateway */
var shared = require('./shared.js');
var Xiaomi = require('./Xiaomi.js');

module.exports = function listen() {
    shared.xiaomi = new Xiaomi();
    shared.xiaomi.on('ready', () => {
        const devices = shared.xiaomi.getDetails();
        console.log('devices = ' + JSON.stringify(devices));
    });
    shared.xiaomi.on('event', (data) => {
        console.log('event = ' + JSON.stringify(data));
        if (data.model === "button") shared.xiaomi.playSound(2, 10);
    });
}