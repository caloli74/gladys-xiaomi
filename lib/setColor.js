var shared = require('./shared.js');

module.exports = function setColor(color, intensity) {
    shared.xiaomi.setColor(color, intensity)
}