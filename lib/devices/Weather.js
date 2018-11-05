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
            if (data.temperature && Math.round(this.temperature != data.temperature / 10)/10) {
                this.temperature = Math.round(data.temperature / 10)/10;
                eventdata.temperature = this.temperature;
            }
            if (data.humidity && this.humidity != Math.round(data.humidity / 100)) {
                this.humidity = Math.round(data.humidity / 100);
                eventdata.humidity = this.humidity;
            }
            if (data.pressure && this.pressure != data.pressure / 1000) {
                this.pressure = data.pressure / 1000;
                eventdata.pressure = this.pressure;
            }
            if (eventdata.temperature || eventdata.humidity || eventdata.pressure) {
                return ({ msg: 'event', data: eventdata });
            }
        }
    }
}