const crypto = require('crypto');
const GenericDevice = require('./GenericDevice.js');
const AQARA_IV = Buffer.from([0x17, 0x99, 0x6d, 0x09, 0x3d, 0x28, 0xdd, 0xb3, 0xba, 0x69, 0x5a, 0x2e, 0x6f, 0x58, 0x56, 0x2e]);

module.exports = class Gateway extends GenericDevice {
    constructor(sid, password, sendSocket) {
        super(sid, 'gateway');

        this.illumination = 0;
        this.intensity = 0;
        this.red = 0;
        this.green = 0;
        this.blue = 0;
        this.charge = 0;

        this._token = '';
        this._password = password;
        this._sendSocket = sendSocket;

        // ask for devices list
        this._sendSocket('{"cmd": "get_id_list"}');
    }

    deviceMessage(message) {
        super.deviceMessage(message);

        // get details for each device
        switch (message.cmd) {
            case 'get_id_list_ack':
                const msg = `{"cmd": "read", "sid": "${this.sid}"}`;
                this._sendSocket(msg);

                var sids = JSON.parse(message.data);
                for (var sid of sids) {
                    const msg = `{"cmd": "read", "sid": "${sid}"}`;
                    this._sendSocket(msg);
                }
                break;

            case 'heartbeat':
                this._token = message.token;
                break;

            case 'report':
            case 'read_ack':
                const data = JSON.parse(message.data);
                if (data.illumination || data.illumination === 0)
                    this.illumination = data.illumination;

                if (data.rgb || data.rgb === 0) {
                    const rgb = data.rgb;
                    this.intensity = Math.trunc(rgb / Math.pow(2, 24));
                    this.red = Math.trunc((rgb % Math.pow(2, 24)) / Math.pow(2, 16));
                    this.green = Math.trunc((rgb % Math.pow(2, 16)) / Math.pow(2, 8));
                    this.blue = rgb % Math.pow(2, 8);
                }
                if (message.cmd === 'report')
                    return ({ msg: 'event', data: { sid: this.sid, model: this.model, red: this.red, green: this.green, blue: this.blue, intensity: this.intensity, illumination: this.illumination } });
                break;
        }
    }

    playSound(sound, volume) {
        const _volume = volume ? volume : 20;
        const msg = `{"cmd": "write", "model": "gateway", "sid": "${this.sid}", "data": "{\\"mid\\":${sound}, \\"vol\\":${_volume}, \\"key\\": \\"${this._calculateKey()}\\"}"}`;
        console.log(msg);
        this._sendSocket(msg);
    }

    setColor(color, intensity) {
        const _intensity = intensity ? intensity : 100;
        this.intensity = _intensity;

        var _color;
        if (typeof color === 'string') {
            _color = { r: 0, g: 0, b: 0 };
            if (color === 'red' || color === 'yellow' || color === 'purple' || color === 'white')
                _color.r = 255;
            if (color === 'green' || color === 'yellow' || color === 'cyan' || color === 'white')
                _color.g = 255;
            if (color === 'blue' || color === 'purple' || color === 'cyan' || color === 'white')
                _color.b = 255;
        }
        else {
            _color = color;
        }
        this.red = _color.r;
        this.green = _color.g;
        this.blue = _color.b;

        const value = _intensity * Math.pow(2, 24) + _color.r * Math.pow(2, 16) + _color.g * Math.pow(2, 8) + _color.b;
        const msg = `{"cmd": "write", "model": "gateway", "sid": "${this.sid}", "data": "{\\"rgb\\":${value}, \\"key\\": \\"${this._calculateKey()}\\"}"}`;
        this._sendSocket(msg);
    }

    // ---------- private methods ----------
    _calculateKey() {
        const cipher = crypto.createCipheriv('aes-128-cbc', this._password, AQARA_IV);
        return cipher.update(this._token, 'ascii', 'hex');
    }
}