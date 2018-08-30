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

        let msg;
        if (message.cmd === "report")
            msg = 'event'
        else
            msg = 'info';
        return ({ msg: msg, data: this });
    }
}