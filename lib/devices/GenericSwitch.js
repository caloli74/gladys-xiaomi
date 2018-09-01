const GenericDevice = require('./GenericDevice.js');

module.exports = class GenericSwitch extends GenericDevice {
    constructor(sid, model) {
        super(sid, model);
        this.lastStatus = null;
    }

    deviceMessage(message) {
        super.deviceMessage(message);

        if (message.cmd === "report") {
            this.lastStatus = JSON.parse(message.data).status;
            return ({ msg: 'event', data: { sid: this.sid, model: this.model, status: this.lastStatus } });
        }
    }
}