const GenericSwitch = require('./GenericSwitch.js');

module.exports = class Switch extends GenericSwitch {
    constructor(sid) {
        super(sid, 'switch');
    }
}