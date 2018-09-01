module.exports = function createDeviceState(device) {
    return new Promise(function (resolve, reject) {
        console.log(JSON.stringify(device));

        for (attribute in device) {
            gladys.deviceType.getByIdentifier({ deviceIdentifier: device.sid, deviceService: 'xiaomi', deviceTypeIdentifier: attribute })
                .then((deviceType) => {
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
    })
}