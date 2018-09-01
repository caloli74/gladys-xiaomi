const GenericSwitch = require('./GenericSwitch.js');

module.exports = class Motion extends GenericSwitch {
    constructor(sid) {
        super(sid, 'motion_sensor');
    }
}