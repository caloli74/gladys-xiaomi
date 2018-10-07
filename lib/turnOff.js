var shared = require('./shared.js');

module.exports = function turnOff() {
    return new Promise(function (resolve, reject) {
        shared.xiaomi.turnOff()
        return resolve('success');
    })
}