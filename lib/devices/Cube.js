const GenericDevice = require('./GenericDevice.js');

module.exports = class Cube extends GenericDevice {
    constructor(sid) {
        super(sid, 'cube');
        this.lastStatus = null;
        this.lastRotate = 0;
    }

    deviceMessage(message) {
        super.deviceMessage(message);

        if (message.cmd === "report") {
            let data = JSON.parse(message.data);
            var eventdata = {};
            eventdata.sid = this.sid;
            eventdata.model = this.model;
            if (data.status)
            {
                this.lastStatus = data.status;
            }
            if (data.rotate)
            {
                this.lastStatus = 'rotate';
                this.lastRotate = data.rotate;
                eventdata.rotate = this.lastRotate;
            }

            eventdata.status = this.lastStatus;
            return ({ msg: 'event', data: eventdata });
        }
    }
}