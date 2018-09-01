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
        for (let _attribute in device) {
            let _value;
            switch (_attribute) {
                case 'lastStatus':
                    switch (device.model) {
                        case 'switch':
                            _attribute = 'switch';
                            _value = SWITCH_STATUS[device[_attribute]];
                            break;
                        case 'motion_sensor':
                            _attribute = 'motion';
                            _value = MOTION_STATUS[device[_attribute]];
                            break;
                        case 'cube':
                            _attribute = 'cube';
                            _value = CUBE_STATUS[device[_attribute]];
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
                case 'charge':
                    _value = device[_attribute];
                    break;
                case 'lastMotion':
                    _attribute = 'lastmotion';
                    _value = device[_attribute];
                    break;
                case 'lastRotate':
                    _attribute = 'rotate';
                    _value = device[_attribute];
                    break;
            }
            if (_value || _value === 0) {
                gladys.deviceType.getByIdentifier({ deviceIdentifier: device.sid, deviceService: 'xiaomi', deviceTypeIdentifier: _attribute })
                    .then((deviceType) => {
                        console.log('OK device = ' + device.model + ' ' + device.sid + ', _attribute = ' + _attribute + ', value = ' + device[_attribute] + ', _value = ' + _value + ', id = ' + deviceType.id);
                    })
                    .catch((err) => {
                        console.log('KO device = ' + device.model + ' ' + device.sid + ', _attribute = ' + _attribute + ', value = ' + device[_attribute] + ', _value = ' + _value);
                        return reject(new Error(err));
                    });
            }
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