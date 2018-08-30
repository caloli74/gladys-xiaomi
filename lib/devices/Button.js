const GenericDevice = require('./GenericDevice.js');

module.exports = class Button extends GenericDevice {
    constructor(sid) {
        super(sid, 'button');
        this.lastStatus = null;
    }

    deviceMessage(message) {
        super.deviceMessage(message);

        this.lastStatus = null;
        if (message.data) {
            let status = JSON.parse(message.data).status;
            if (status) {
                this.lastStatus = status;
            }
        }

        return ({ msg: 'device', data: { model: this.model, sid: this.sid, charge: this.charge, status: this.lastStatus } });
    }
}