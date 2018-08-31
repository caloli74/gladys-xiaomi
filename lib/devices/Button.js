const GenericDevice = require('./GenericDevice.js');

module.exports = class Button extends GenericDevice {
    constructor(sid) {
        super(sid, 'button');
        this.status = null;
    }

    deviceMessage(message) {
        super.deviceMessage(message);

        this.status = null;
        if (message.data) {
            this.status = JSON.parse(message.data).status;
        }

        if (message.cmd === "report")
            return({msg:'event', data:{sid: this.sid, model: 'button', status: this.status}});
    }
}