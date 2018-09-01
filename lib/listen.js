/* daemon to listen messages sent by the gateway */
var Xiaomi = require('./Xiaomi.js');
var createDevice = require('./createDevice.js');
var createDeviceState = require('./createDeviceState.js');

module.exports = function listen() {
    gladys.param.getValue('Xiaomi_password')
        .then((password) => {
            var click = 0;
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
                if (data.model === 'switch') {
                    click++;
                    switch (click) {
                        case 1:
                            xiaomi.setColor('red');
                            break;
                        case 2:
                            xiaomi.setColor('green');
                            break;
                        case 3:
                            xiaomi.setColor('blue');
                            break;
                        case 4:
                            xiaomi.setColor('yellow');
                            break;
                        case 5:
                            xiaomi.setColor('purple');
                            break;
                        case 6:
                            xiaomi.setColor('cyan');
                            break;
                        case 7:
                            xiaomi.setColor('white');
                            break;
                    }
                }
                console.log('event = ' + JSON.stringify(data));
            });
        })

        .catch((err) => {
            console.log(err);
        });
}

// xiaomi.setColor({r:255, g:0, b:0}, 50);
// xiaomi.playSound(12, 10);