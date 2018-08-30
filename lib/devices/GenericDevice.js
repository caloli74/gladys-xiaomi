module.exports = class GenericDevice extends events.EventEmitter {
    constructor(sid, model) {
        this.sid = sid;
        this.model = model;
    }

    deviceMessage(message) {
        this.emit('device',this.model);
    }

}