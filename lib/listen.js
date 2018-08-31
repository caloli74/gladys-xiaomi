/* daemon to listen messages sent by the gateway */
var shared = require('./shared.js');
var Xiaomi = require('./Xiaomi.js');

module.exports = function listen() {
    shared.xiaomi = new Xiaomi("wkj8q0gi2nmaugth");
    shared.xiaomi.on('ready', () => {
        const devices = shared.xiaomi.getDetails();
        console.log('devices = ' + JSON.stringify(devices));
    });
    shared.xiaomi.on('event', (data) => {
        console.log('event = ' + JSON.stringify(data));
        if (data.model === "button") console.log('devices = ' + JSON.stringify(shared.xiaomi.getDetails()));
        //if (data.model === "button") shared.xiaomi.setColor({r:255, g:0, b:0}, 50);
        //if (data.model === "button") shared.xiaomi.playSound(12, 50);
    });
}