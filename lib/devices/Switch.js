const GenericDevice = require('./GenericDevice.js');

module.exports = class Switch extends GenericDevice {
    constructor(sid) {
        super(sid, 'switch');
        this.lastStatus = null;
    }

    deviceMessage(message) {
        super.deviceMessage(message);

        if (message.cmd === "report") {
            this.lastStatus = JSON.parse(message.data).status;
            return ({ msg: 'event', data: { sid: this.sid, model: this.model, lastStatus: this.lastStatus } });
        }
    }
}