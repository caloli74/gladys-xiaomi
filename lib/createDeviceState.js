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
            let _devicetype;
            let _value;
            switch (_attribute) {
                case 'lastStatus':
                    switch (device.model) {
                        case 'switch':
                            _devicetype = 'switch';
                            _value = SWITCH_STATUS[device[_attribute]];
                            break;
                        case 'motion_sensor':
                            _devicetype = 'motion';
                            _value = MOTION_STATUS[device[_attribute]];
                            break;
                        case 'cube':
                            _devicetype = 'cube';
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
                    _devicetype = _attribute;
                    _value = device[_attribute];
                    break;
                case 'lastMotion':
                    _devicetype = 'lastmotion';
                    _value = device[_attribute];
                    break;
                case 'lastRotate':
                    _devicetype = 'rotate';
                    _value = device[_attribute];
                    break;
            }
            if (_value || _value === 0) {
                gladys.deviceType.getByIdentifier({ deviceIdentifier: device.sid, deviceService: 'xiaomi', deviceTypeIdentifier: _devicetype })
                    .then((deviceType) => {
                        //console.log('OK device = ' + device.model + ' ' + device.sid + ', _devicetype = ' + _devicetype + ', value = ' + device[_attribute] + ', _value = ' + _value + ', id = ' + deviceType.id);
                        gladys.deviceState.create({ devicetype: deviceType.id, value: _value })
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
        }
    })
}