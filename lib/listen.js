/* daemon to listen messages sent by the gateway */
var shared = require('./shared.js');
var Xiaomi = require('./Xiaomi.js');
var createDevice = require('./createDevice.js');
var createDeviceState = require('./createDeviceState.js');

module.exports = function listen() {
    //return;
    gladys.param.getValue('Xiaomi_password')
        .then((password) => {
            shared.xiaomi = new Xiaomi(password);

            shared.xiaomi.on('ready', () => {
                let devices = shared.xiaomi.getDetails();
                for (let device in devices) {
                    createDevice(devices[device]);
                    createDeviceState(devices[device]);
                }
            });

            shared.xiaomi.on('event', (data) => {
                createDevice(data);
                createDeviceState(data);
            });
        })

        .catch((err) => {
            console.log(err);
        });
}

// shared.xiaomi.setColor({r:255, g:0, b:0}, 50);
// shared.xiaomi.playSound(12, 10);