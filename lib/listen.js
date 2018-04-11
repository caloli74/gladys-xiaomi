/* daemon to listen messages sent by the gateway */
var shared = require('./shared.js');
var Xiaomi = require('./Xiaomi.js');

module.exports = function listen() {
    shared.xiaomi = new Xiaomi('wkj8q0gi2nmaugth');
}