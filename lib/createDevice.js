module.exports = function createDevice(device) {
    return new Promise(function (resolve, reject) {
        var newDevice;
        switch (device.model) {
            case 'gateway':
                newDevice = {
                    device: { name: 'Gateway', identifier: device.sid, protocol: 'zigbee', service: 'xiaomi' },
                    types: [
                        { identifier: 'light', type: 'binary', unit: '', min: 0, max: 1, sensor: false },
                        { identifier: 'intensity', type: 'intensity', unit: '', min: 0, max: 100, sensor: false },
                        { identifier: 'red', type: 'red', unit: '', min: 0, max: 255, sensor: false },
                        { identifier: 'green', type: 'green', unit: '', min: 0, max: 255, sensor: false },
                        { identifier: 'blue', type: 'blue', unit: '', min: 0, max: 255, sensor: false },
                        { identifier: 'illumination', type: 'illumination', unit: '', min: 0, max: 9999, sensor: true }
                    ]
                };
                break;
            case 'switch':
                newDevice = {
                    device: {
                        name: 'Switch', identifier: device.sid, protocol: 'zigbee', service: 'xiaomi'
                    },
                    types: [
                        { identifier: 'charge', type: 'charge', unit: '%', min: 0, max: 100, sensor: true },
                        { identifier: 'switch', type: 'status', min: 0, max: 4, sensor: true }
                    ]
                };
                break
            case 'motion_sensor':
                newDevice = {
                    device: {
                        name: 'Motion sensor', identifier: device.sid, protocol: 'zigbee', service: 'xiaomi'
                    },
                    types: [
                        { identifier: 'charge', type: 'charge', unit: '%', min: 0, max: 100, sensor: true },
                        { identifier: 'motion', type: 'status', min: 0, max: 1, sensor: true },
                        { identifier: 'lastmotion', type: 'seconds', min: 0, max: 1800, sensor: true }
                    ]
                };
                break
            case 'temp_sensor':
                newDevice = {
                    device: {
                        name: 'Temperature sensor', identifier: device.sid, protocol: 'zigbee', service: 'xiaomi'
                    },
                    types: [
                        { identifier: 'charge', type: 'charge', unit: '%', min: 0, max: 100, sensor: true },
                        { identifier: 'temperature', type: 'temperature', unit: '°C', min: -100, max: 100, sensor: true },
                        { identifier: 'humidity', type: 'humidity', unit: '%', min: 0, max: 100, sensor: true }
                    ]
                };
                break
            case 'cube':
                newDevice = {
                    device: {
                        name: 'Cube', identifier: device.sid, protocol: 'zigbee', service: 'xiaomi'
                    },
                    types: [
                        { identifier: 'charge', type: 'charge', unit: '%', min: 0, max: 100, sensor: true },
                        { identifier: 'cube', type: 'status', min: 0, max: 8, sensor: true },
                        { identifier: 'rotate', type: 'rotate', min: -100, max: 100, sensor: true }
                    ]
                };
                break
                case 'weather.v1':
                newDevice = {
                    device: {
                        name: 'Weather sensor', identifier: device.sid, protocol: 'zigbee', service: 'xiaomi'
                    },
                    types: [
                        { identifier: 'charge', type: 'charge', unit: '%', min: 0, max: 100, sensor: true },
                        { identifier: 'temperature', type: 'temperature', unit: '°C', min: -100, max: 100, sensor: true },
                        { identifier: 'humidity', type: 'humidity', unit: '%', min: 0, max: 100, sensor: true },
                        { identifier: 'pressure', type: 'pressure', unit: 'KPa', min: 0, max: 2000, sensor: true }
                    ]
                };
                break
                case 'magnet':
                newDevice = {
                    device: {
                        name: 'Magnet', identifier: device.sid, protocol: 'zigbee', service: 'xiaomi'
                    },
                    types: [
                        { identifier: 'charge', type: 'charge', unit: '%', min: 0, max: 100, sensor: true },
                        { identifier: 'status', type: 'status', min: 0, max: 1, sensor: true },
                    ]
                };
                break
            default:
                console.log('* ' + device.model + ' => device non pris en charge');
        }

        if (newDevice) {
            gladys.device.create(newDevice)
                .then(() => {
                    return resolve('success');
                })
                .catch((err) => {
                    return reject(new Error(err));
                });
        }
    })
}