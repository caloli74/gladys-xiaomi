const GenericDevice = require('./GenericDevice.js');

module.exports = class Motion extends GenericDevice {
    constructor(sid) {
        super(sid, 'motion_sensor');
        this.lastStatus = null;
        this.lastMotion = 0;
    }

    deviceMessage(message) {
        super.deviceMessage(message);

        if (message.cmd === "report") {
            let data = JSON.parse(message.data);
            var eventdata = {};
            eventdata.sid = this.sid;
            eventdata.model = this.model;
            if (data.status)
                this.lastStatus = data.status;
            if (data.no_motion){
                this.lastStatus = 'no_motion';
                this.lastMotion = data.no_motion;
                eventdata.lastMotion = this.lastMotion;
            }

            eventdata.lastStatus = this.lastStatus;
            return ({ msg: 'event', data: eventdata });
        }
    }
}