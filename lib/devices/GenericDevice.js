const MIN_VOLT = 2800
const MAX_VOLT = 3300

module.exports = class GenericDevice {
    constructor(sid, model) {
        this.sid = sid;
        this.model = model;
        this.charge = null;
    }

    deviceMessage(message) {
        let voltage = JSON.parse(message.data).voltage;
        if (voltage){
            this.charge = Math.round((MAX_VOLT - voltage) / (MAX_VOLT - MIN_VOLT) * 100) + ' %';
            return({msg:'device',data:{model: this.model,charge: this.charge}});
        }
    }

}