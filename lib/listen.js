/* daemon to listen messages sent by the gateway */
var Xiaomi = require('./Xiaomi.js');

module.exports = function listen() {
    gladys.param.getValue('Xiaomi_password')
        .then((password) => {
            var xiaomi = new Xiaomi(password);

            xiaomi.on('ready', () => {
                let devices = xiaomi.getDetails();
                for (let device in devices) {
                    createDevice(devices[device]);
                }
            });

            xiaomi.on('event', (data) => {
                console.log('event = ' + JSON.stringify(data));
                //if (data.model === "switch") console.log('xiaomi = ' + xiaomi.ready + ' ' + xiaomi._heartbeat + ' ' + xiaomi._nbDevices + ' ' + xiaomi._devicesRead);
                //if (data.model === "switch") console.log('devices = ' + JSON.stringify(xiaomi.getDetails()));
                //if (data.model === "switch") xiaomi.setColor({r:255, g:0, b:0}, 50);
                //if (data.model === "switch") xiaomi.playSound(12, 10);
            });
        })

        .catch((err) => {
            console.log(err);
        });
}

function createDevice(device) {
    switch (device.model) {
        case 'gateway':
            var myDevice = {
                device: { name: 'Gateway', identifier: device.sid, protocol: 'zigbee', service: 'xiaomi' },
                types: [
                    { identifier: device.sid, type: 'binary', unit: '', min: 0, max: 1, sensor: false },
                    { identifier: device.sid, type: 'intensity', unit: '', min: 0, max: 100, sensor: false },
                    { identifier: device.sid, type: 'red', unit: '', min: 0, max: 255, sensor: false },
                    { identifier: device.sid, type: 'green', unit: '', min: 0, max: 255, sensor: false },
                    { identifier: device.sid, type: 'blue', unit: '', min: 0, max: 255, sensor: false },
                    { identifier: device.sid, type: 'illumination', unit: '', min: 0, max: 9999, sensor: true },
                    { identifier: device.sid, type: 'battery', unit: '%', min: 0, max: 100, sensor: true }
                ]
            };
            gladys.device.create(myDevice)
                .catch((err) => {
                    console.log(err);
                });

        default:
            console.log('* ' + device.model + ' => ' + device.sid);
    }
}