module.exports = function createDevice(device) {
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
                    { identifier: 'switch', type: 'status', min: 0, max: 4, sensor: true },
                    { identifier: 'battery', type: 'battery', unit: '%', min: 0, max: 100, sensor: true }
                ]
            };
            break
        case 'motion_sensor':
            newDevice = {
                device: {
                    name: 'Motion sensor', identifier: device.sid, protocol: 'zigbee', service: 'xiaomi'
                },
                types: [
                    { identifier: 'motion', type: 'status', min: 0, max: 1, sensor: true },
                    { identifier: 'lastmotion', type: 'seconds', min: 0, max: 1800, sensor: true },
                    { identifier: 'battery', type: 'battery', unit: '%', min: 0, max: 100, sensor: true }
                ]
            };
            break
        case 'temp_sensor':
            newDevice = {
                device: {
                    name: 'Temperature sensor', identifier: device.sid, protocol: 'zigbee', service: 'xiaomi'
                },
                types: [
                    { identifier: 'temperature', type: 'temperature', unit: '°C', min: -100, max: 100, sensor: true },
                    { identifier: 'humidity', type: 'humidity', unit: '%', min: 0, max: 100, sensor: true },
                    { identifier: 'battery', type: 'battery', unit: '%', min: 0, max: 100, sensor: true }
                ]
            };
            break
        case 'cube':
            newDevice = {
                device: {
                    name: 'Cube', identifier: device.sid, protocol: 'zigbee', service: 'xiaomi'
                },
                types: [
                    { identifier: 'cube', type: 'status', min: 0, max: 7, sensor: true },
                    { identifier: 'rotate', type: 'rotate', min: -100, max: 100, sensor: true },
                    { identifier: 'battery', type: 'battery', unit: '%', min: 0, max: 100, sensor: true }
                ]
            };
            break
        default:
            console.log('* ' + device.model + ' => device non pris en charge');
    }

    if (newDevice) {
        gladys.device.create(newDevice)
            .catch((err) => {
                console.log(err);
            });
    }
}