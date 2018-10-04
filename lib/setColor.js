var shared = require('./shared.js');

module.exports = function setColor(color, intensity) {
    return new Promise(function (resolve, reject) {
        shared.xiaomi.setColor(color, intensity)
        return resolve('success');
    })
}