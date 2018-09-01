const GenericSwitch = require('./GenericSwitch.js');

module.exports = class Cube extends GenericSwitch {
    constructor(sid) {
        super(sid, 'cube');
    }
}