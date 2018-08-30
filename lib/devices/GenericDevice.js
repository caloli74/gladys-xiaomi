module.exports = class GenericDevice {
    constructor(sid, model) {
        this.sid = sid;
        this.model = model;
    }

    deviceMessage(message) {
        return({msg:'device',data:this.model});
    }

}