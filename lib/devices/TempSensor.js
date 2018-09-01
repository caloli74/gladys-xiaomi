const GenericDevice = require('./GenericDevice.js');

module.exports = class TempSensor extends GenericDevice {
    constructor(sid) {
        super(sid, 'temp_sensor');
        this.temperature = 0;
        this.humidity = 0;
    }

    deviceMessage(message) {
        super.deviceMessage(message);

        if (message.cmd === "report" || message.cmd === 'read_ack') {
            let data = JSON.parse(message.data);
            var eventdata = {};
            eventdata.sid = this.sid;
            eventdata.model = this.model;
            if (data.temperature && this.temperature != data.temperature / 100) {
                this.temperature = data.temperature / 100;
                eventdata.temperature = this.temperature;
            }
            if (data.humidity && this.humidity != data.humidity / 100) {
                this.humidity = data.humidity / 100;
                eventdata.humidity = this.humidity;
            }
            if (eventdata.temperature || eventdata.humidity) {
                return ({ msg: 'event', data: eventdata });
            }
        }
    }
}