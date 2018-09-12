const events = require('events');
const dgram = require('dgram');
const schedule = require('node-schedule');

const GenericDevice = require('./devices/GenericDevice.js');
const Gateway = require('./devices/Gateway.js');
const Switch = require('./devices/Switch.js');
const TempSensor = require('./devices/TempSensor.js');
const Motion = require('./devices/Motion.js');
const Cube = require('./devices/Cube.js');

const DISCOVERY_PORT = 4321;
const SERVER_PORT = 9898;
const MULTICAST_ADDRESS = '224.0.0.50';

module.exports = class Xiaomi extends events.EventEmitter {

    constructor(password) {
        super();
        this.ready = false;
        this.devices = {};
        this.password = password;

        this._socket = dgram.createSocket({ type: 'udp4', reuseAddr: true });
        this._socket.on('listening', this._onListening.bind(this));
        this._socket.on('message', this._onMessage.bind(this));
        this._socket.bind(SERVER_PORT);

        this._heartbeat = false;
        this._nbDevices = 1;
        this._devicesRead = 0;

        schedule.scheduleJob('0 0 * * * *', this._reportDevices.bind(this));
    }

    getDetails() {
        return (this.devices);
    }

    playSound(sound, volume) {
        this._getGateway().playSound(sound, volume);
    }

    setColor(color, intensity) {
        this._getGateway().setColor(color, intensity);
    }

    // ---------- private methods ----------
    _onListening() {
        this._socket.addMembership(MULTICAST_ADDRESS);
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

        // transmit message to device (only if all is ready)
        let answer = this.devices[message.sid].deviceMessage(message);
        if (answer && this.ready) {
            this.emit(answer.msg, answer.data);
        }

        // determine if everything is loaded
        if (!this.ready) {
            if (message.cmd === 'get_id_list_ack')
                this._nbDevices = JSON.parse(message.data).length + 1;
            if (message.cmd === 'read_ack')
                this._devicesRead++;
            if (message.cmd === 'heartbeat' && message.model === 'gateway')
                this._heartbeat = true;
            if (this._nbDevices === this._devicesRead && this._heartbeat) {
                this.ready = true;
                this.emit('ready');
            }
        }
    }

    _Whois() {
        const payload = '{"cmd": "whois"}';
        this._socket.send(payload, 0, payload.length, DISCOVERY_PORT, MULTICAST_ADDRESS);
    }

    _createDevice(message) {
        let device;
        switch (message.model) {
            case 'gateway':
                let ip = message.ip ? message.ip : JSON.parse(message.data).ip;
                device = new Gateway(message.sid, this.password, (msg) => this._socket.send(msg, 0, msg.length, SERVER_PORT, ip));
                break
            case 'switch':
                device = new Switch(message.sid);
                break
            case 'sensor_ht':
                device = new TempSensor(message.sid);
                break
            case 'motion':
                device = new Motion(message.sid);
                break
            case 'sensor_cube.aqgl01':
                device = new Cube(message.sid);
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
        for (let sid in this.devices) {
            if (this.devices[sid] instanceof Gateway) {
                return this.devices[sid];
                break;
            }
        }
    }

    _reportDevices() {
        for (let sid in this.devices) {
            let answer = this.devices[sid].deviceReport();
            if (answer && this.ready) {
                this.emit(answer.msg, answer.data);
            }
        }
    }
}