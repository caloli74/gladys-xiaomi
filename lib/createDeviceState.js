const SWITCH_STATUS = {
    click: 1,
    double_click: 2,
    long_click_press: 3,
    long_click_release: 4
};

module.exports = function createDeviceState(device) {
    for (attribute in device) {
        let _value;
        switch (attribute) {
            case 'lastStatus':
                switch (device.model) {
                    case 'switch':
                        _value = SWITCH_STATUS[device[attribute]];
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
        if (_value)
            console.log('attribute = ' + attribute + ', value = ' + device[attribute] + ', value = ' + _value);
    }
    /*
    return new Promise(function (resolve, reject) {
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
    })
    */
}

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