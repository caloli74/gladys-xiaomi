const events = require('events');
const dgram = require('dgram');
const schedule = require('node-schedule');
//const GenericDevice = require('./devices/GenericDevice.js');
//const Gateway = require('./devices/Gateway.js');
//const Button = require('./devices/Button.js');
//const Temperature = require('./devices/Temperature.js');

const DISCOVERY_PORT = 4321;
const SERVER_PORT = 9898;
const MULTICAST_ADDRESS = '224.0.0.50';

module.exports = class Xiaomi extends events.EventEmitter {
    constructor() {
        console.log('debut constructeur');
        super();
        this.devices = [];
        console.log('create socket');
        this.socket = dgram.createSocket({ type: 'udp4', reuseAddr: true });
        console.log('listening');
        this.socket.on('listening', this.onListening.bind(this));
        console.log('message');
        this.socket.on('message', this.onMessage.bind(this));
        console.log('bind');
        this.socket.bind(SERVER_PORT);
        console.log('fin constructeur');
    }

    onListening() {
        console.log('on listening addmembership');
        this.socket.addMembership(MULTICAST_ADDRESS);
        console.log('on listening sendsocket');
        this.sendSocket({ cmd: "whois" });
        console.log('on listening fin');

//        this.on('ready', () => {
//            console.log('xiaomi ready')
//            schedule.scheduleJob('0 * * * * *', () => {
//                this.sendSocket({ cmd: "get_id_list", sid: this._getGateway().sid });
//            });
//        });
    }

    onMessage(msg) {
        console.log('on message debut');
        try {
            console.log('on message parse');
            var parsed = JSON.parse(msg.toString());
            console.log('on message log');
            console.log('xioami msg ' + (new Date).toLocaleTimeString() + ' : ' + msg.toString());
        }
        catch (err) {
            console.log('on message err');
            return
        }

//        if (parsed.cmd == 'iam' || parsed.cmd == 'heartbeat' || parsed.cmd == 'report' || parsed.cmd.indexOf('_ack') != -1) {
//            var device = this._findDevice(parsed);
//            this.devices[device].onMessage(parsed);
//        }
        console.log('on message fin');
    }

    sendSocket(msg) {
        console.log('sendsocket deb');
        var port;
        console.log('sendsocket if');
        if (msg.cmd == 'whois')
            port = DISCOVERY_PORT
        else
            port = SERVER_PORT;
        console.log('sendsocket payload');
        var payload = JSON.stringify(msg);
        console.log('sendsocket send');
        this.socket.send(payload, 0, payload.length, port, MULTICAST_ADDRESS);
        console.log('sendsocket fin');
    }

//    playSound(sound) {
//        this._getGateway().playSound(sound);
//    }

//    setColor(color) {
//        this._getGateway().setColor(color);
//    }

    // ---------- private methods ----------
//    _findDevice(parsed) {
//        for (var i = 0; i < this.devices.length; i++) {
//            if (this.devices[i].sid == parsed.sid) {
//                return i;
//                break;
//            }
//        }
//
//        this.devices.push(this._recordDevice(parsed.sid, parsed.model));
//        return this.devices.length - 1;
//    }

//    _recordDevice(sid, model) {
//        switch (model) {
//            case 'gateway':
//                return new Gateway(sid, model, this);
//                break
//            case 'switch':
//                return new Button(sid, model, this);
//                break
//            case 'sensor_ht':
//                return new Temperature(sid, model, this);
//                break
//            default:
//                return new GenericDevice(sid, model, this);
//        }
//    }

//    _getGateway() {
//        for (var i = 0; i < this.devices.length; i++) {
//            if (this.devices[i] instanceof Gateway) {
//                return this.devices[i];
//                break;
//            }
//        }
//
//    }
}