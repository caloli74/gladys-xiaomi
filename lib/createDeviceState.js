module.exports = function createDeviceState(device) {
    console.log(JSON.stringify(device));
    if (device.charge) {
        gladys.deviceType.getByIdentifier({ deviceIdentifier: device.sid, deviceService: 'xiaomi', deviceTypeIdentifier: 'charge' })
            .then((deviceType) => {
                console.log(JSON.stringify(deviceType));
            })
            .catch((err) => {
                console.log(err);
            });
    }
}