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

const MAGNET_STATUS = {
    open: 1,
    close: 0
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
                        case 'magnet' :
                        case 'sensor_magnet.aq2':
                            _devicetype = 'magnet';
                            _value = MAGNET_STATUS[device[_attribute]];
                            break;
                    }
                    break;
                case 'red':
                case 'green':
                case 'blue':
                    // if intensity is 0, don't change r g b values
                    _devicetype = _attribute;
                    _value = device.intensity === 0 ? null : _value = device[_attribute];
                    break;
                case 'light':
                case 'illumination':
                case 'temperature':
                case 'humidity':
                case 'charge':
                case 'pressure':
                    _devicetype = _attribute;
                    _value = device[_attribute];
                    break;
                case 'intensity':
                    _devicetype = _attribute;
                    _value = device[_attribute] === 0 ? null : _value = device[_attribute];
                    createDeviceState({ sid: device.sid, model: device.model, light: _value ? 1 : 0 });
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
                return resolve('success');
            }
        }
    })
}