const GenericDevice = require('./GenericDevice.js');

module.exports = class TempSensor extends GenericDevice {
    constructor(sid) {
        super(sid, 'weather.v1');
        this.temperature = 0;
        this.humidity = 0;
        this.pressure = 0;
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
            if (data.pressure && this.pressure != data.pressure / 100) {
                this.pressure = data.pressure / 100;
                eventdata.pressure = this.pressure;
            }
            if (eventdata.temperature || eventdata.humidity || eventdata.pressure) {
                return ({ msg: 'event', data: eventdata });
            }
        }
    }
}