var shared = require('./shared.js');

module.exports = function install() {
    return new Promise(function (resolve, reject) {
        gladys.param.setValue({ name: 'Xiaomi_password2', value: 'Gateway password' })
        .then(() => {
            console.log("Indiquer le mot de passe du gateway dans le paramètre Xiaomi_password de Gladys");
            return resolve('success');
        })
        .catch((err) => {
            return reject(new Error(err));
        });
    });
}