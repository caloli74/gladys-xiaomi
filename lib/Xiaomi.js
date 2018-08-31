const events = require('events');
const dgram = require('dgram');
const schedule = require('node-schedule');
const GenericDevice = require('./devices/GenericDevice.js');
const Gateway = require('./devices/Gateway.js');
const Button = require('./devices/Button.js');
//const Temperature = require('./devices/Temperature.js');

const DISCOVERY_PORT = 4321;
const SERVER_PORT = 9898;
const MULTICAST_ADDRESS = '224.0.0.50';

module.exports = class Xiaomi extends events.EventEmitter {

    constructor() {
        super();
        this.devices = {};

        this.socket = dgram.createSocket({ type: 'udp4', reuseAddr: true });
        this.socket.on('listening', this._onListening.bind(this));
        this.socket.on('message', this._onMessage.bind(this));
        this.socket.bind(SERVER_PORT);
    }

    getDetails() {
        return(this.devices);
    }

    playSound(sound, volume) {
        this._getGateway().playSound(sound, volume);
    }

    setColor(color) {
        this._getGateway().setColor(color);
    }

    // ---------- private methods ----------
    _onListening() {
        this.socket.addMembership(MULTICAST_ADDRESS);
        this._Whois();
    }

    _onMessage(msg) {
        //console.log('xioami ' + (new Date).toLocaleTimeString() + ' : ' + msg.toString());
        let message = JSON.parse(msg.toString());
        let device = this._findDevice(message.sid);

        // create device if not already exists
        if (!device) {
            this.devices[message.sid] = this._createDevice(message);
        }

        // transmit message to device
        let answer = this.devices[message.sid].deviceMessage(message);
        if (answer) {
            this.emit(answer.msg, answer.data);
        }
    }

    _Whois() {
        const payload = '{"cmd": "whois"}';
        this.socket.send(payload, 0, payload.length, DISCOVERY_PORT, MULTICAST_ADDRESS);
    }

    _createDevice(message) {
        let device;
        switch (message.model) {
            case 'gateway':
                let ip = message.ip ? message.ip : JSON.parse(message.data).ip;
                device = new Gateway(message.sid, (msg) => this.socket.send(msg, 0, msg.length, SERVER_PORT, ip));
                break

            case 'switch':
                device = new Button(message.sid);
                break

            default:
                device = new GenericDevice(message.sid, message.model);
        }
        return device;
    }

    _findDevice(sid) {
        return this.devices[sid] ? this.devices[sid] : null;
    }

    _getGateway() {
        for (let device in this.devices) {
            console.log(JSON.stringify(device));
            if (device instanceof Gateway) {
                return device;
                break;
            }
        }
    }

}