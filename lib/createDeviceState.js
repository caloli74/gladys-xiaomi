module.exports = function createDeviceState(device) {
    console.log(JSON.stringify(device));
    if (device.battery) {
        gladys.deviceType.getByIdentifier({ deviceIdentifier: device.sid, deviceService: 'xiaomi', deviceTypeIdentifier: 'battery' })
            .then((deviceType) => {
                console.log(JSON.stringify(deviceType));
            })
            .catch((err) => {
                console.log(err);
            });
    }
}