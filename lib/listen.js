/* daemon to listen messages sent by the gateway */
var Xiaomi = require('./Xiaomi.js');
var createDevice = require('./createDevice.js');
var createDeviceState = require('./createDeviceState.js');

module.exports = function listen() {
    gladys.param.getValue('Xiaomi_password')
        .then((password) => {
            var xiaomi = new Xiaomi(password);

            xiaomi.on('ready', () => {
                let devices = xiaomi.getDetails();
                for (let device in devices) {
                    createDevice(devices[device]);
                    createDeviceState(devices[device]);
                }
            });

            xiaomi.on('event', (data) => {
                createDeviceState(data);
                console.log('event = ' + JSON.stringify(data));
            });
        })

        .catch((err) => {
            console.log(err);
        });
}

// xiaomi.setColor({r:255, g:0, b:0}, 50);
// xiaomi.playSound(12, 10);