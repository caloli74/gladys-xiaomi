var shared = require('./shared.js');

module.exports = function playSound(sound, volume) {
    shared.xiaomi.playSound(sound, volume)
}