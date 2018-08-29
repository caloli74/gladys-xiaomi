/* daemon to listen messages sent by the gateway */
var shared = require('./shared.js');
var Xiaomi = require('./Xiaomi.js');

module.exports = function listen() {
    gladys.param.getValue('Xiaomi_password')
    .then((password) => {
        shared.xiaomi = new Xiaomi(password);
        console.log('xiaomi listen');
        return resolve('success');
    })
    .catch((err) => {
        return reject(new Error(err));
    })
}