/* daemon to listen messages sent by the gateway */
var shared = require('./shared.js');
var Xiaomi = require('./Xiaomi.js');

module.exports = function listen() {
    shared.xiaomi = new Xiaomi();
    shared.xiaomi.on('device', (data) => console.log('message = ' + JSON.stringify(data)));
}