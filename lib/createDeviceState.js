module.exports = function createDeviceState(device) {
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
}