var shared = require('./shared.js');

module.exports = function install() {
    return new Promise(function (resolve, reject) {
        console.log('xixi' + shared.xiaomi._getGateway().token);
        return resolve('success');
    });
}