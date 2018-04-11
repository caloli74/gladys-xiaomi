var shared = require('./shared.js');

module.exports = function install() {
    return new Promise(function (resolve, reject) {
        return resolve('success');
        console.log('xixi' + shared.xiaomi._getGateway().token);
    });
}