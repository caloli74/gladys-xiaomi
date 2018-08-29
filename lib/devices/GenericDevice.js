module.exports = class GenericDevice {
    constructor(sid, model) {
        this.sid = sid;
        this.model = model;
    }

    onMessage(msg) {
    }

}