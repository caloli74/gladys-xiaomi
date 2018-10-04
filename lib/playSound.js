var shared = require('./shared.js');

module.exports = function playSound(sound, volume) {
    return new Promise(function (resolve, reject) {
        shared.xiaomi.playSound(sound, volume)
        return resolve('success');
    })
}