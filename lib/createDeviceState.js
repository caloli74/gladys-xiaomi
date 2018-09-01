const SWITCH_STATUS = {
    click: 1,
    double_click: 2,
    long_click_press: 3,
    long_click_release: 4
};

const MOTION_STATUS = {
    motion: 1,
    no_motion: 2
};

const CUBE_STATUS = {
    alert: 1,
    tap_twice: 2,
    flip90: 3,
    flip180: 4,
    rotate: 5,
    shake_air: 6,
    move: 7,
    free_fall: 8
};

module.exports = function createDeviceState(device) {
    return new Promise(function (resolve, reject) {
        for (attribute in device) {
            let _value;
            switch (attribute) {
                case 'lastStatus':
                    switch (device.model) {
                        case 'switch':
                            _value = SWITCH_STATUS[device[attribute]];
                            break;
                        case 'motion_sensor':
                            _value = MOTION_STATUS[device[attribute]];
                            break;
                        case 'cube':
                            _value = CUBE_STATUS[device[attribute]];
                            break;
                    }
                    break;
                case 'illumination':
                case 'intensity':
                case 'red':
                case 'green':
                case 'blue':
                case 'temperature':
                case 'humidity':
                case 'lastMotion':
                case 'lastRotate':
                case 'charge':
                    _value = device[attribute];
                    break;
            }
            if (_value || _value === 0)
                gladys.deviceType.getByIdentifier({ deviceIdentifier: device.sid, deviceService: 'xiaomi', deviceTypeIdentifier: attribute })
                    .then((deviceType) => {
                        console.log('attribute = ' + attribute + ', value = ' + device[attribute] + ', _value = ' + _value + ', _value = ' + deviceType.id);
                    })
                    .catch((err) => {
                        return reject(new Error(err));
                    });
        }
    })
}
/*
        console.log(JSON.stringify(device));
        if (device.charge) {
            gladys.deviceType.getByIdentifier({ deviceIdentifier: device.sid, deviceService: 'xiaomi', deviceTypeIdentifier: 'charge' })
                .then((deviceType) => {
                    gladys.deviceState.create({ devicetype: deviceType.id, value: device.charge })
                        .then(() => {
                            return resolve('success');
                        })
                        .catch((err) => {
                            return reject(new Error(err));
                        });
                })
                .catch((err) => {
                    return reject(new Error(err));
                });
        }
    */

/*
        for (attribute in device) {
            console.log('attribute = ' + attribute + ', value = ' + device[attribute]);
            gladys.deviceType.getByIdentifier({ deviceIdentifier: device.sid, deviceService: 'xiaomi', deviceTypeIdentifier: attribute })
                .then((deviceType) => {
                    console.log('deviceType.id =' + deviceType.id + ' attribute =' + attribute + ' value ' + device[attribute]);
                    gladys.deviceState.create({ devicetype: deviceType.id, value: device[attribute] })
                        .then(() => {
                            return resolve('success');
                        })
                        .catch((err) => {
                            return reject(new Error(err));
                        });
                })
                .catch((err) => {
                    return reject(new Error(err));
                });
        }
*/