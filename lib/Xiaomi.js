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
        super();
        this.devices = {[id] : GenericDevice} = {};
        this.socket = dgram.createSocket({ type: 'udp4', reuseAddr: true });
        this.socket.on('listening', this.onListening.bind(this));
        this.socket.on('message', this.onMessage.bind(this));
        this.socket.bind(SERVER_PORT);
    }

    onListening() {
        this.socket.addMembership(MULTICAST_ADDRESS, '127.0.0.1');
        this.sendSocket({ cmd: "whois" });
    }

    onMessage(msg) {
        console.log('xioami msg ' + (new Date).toLocaleTimeString() + ' : ' + msg.toString());

        let parsed = JSON.parse(msg.toString());
//        let device = this._findDevice(parsed.sid);
//        if (!device)
//        {
//            console.log('creation du device ' + parsed.model + ' ' + parsed.sid)
//            this.sensors[parsed.sid] = this._createDevice(parsed.sid, parsed.model);
//        }
            

//        if (parsed.cmd == 'iam' || parsed.cmd == 'heartbeat' || parsed.cmd == 'report' || parsed.cmd.indexOf('_ack') != -1) {
//            var device = this._findDevice(parsed);
//            this.devices[device].onMessage(parsed);
//        }
    }

    sendSocket(msg) {
        var port;
        if (msg.cmd == 'whois')
            port = DISCOVERY_PORT
        else
            port = SERVER_PORT;
        var payload = JSON.stringify(msg);
        this.socket.send(payload, 0, payload.length, port, MULTICAST_ADDRESS);
    }

//    playSound(sound) {
//        this._getGateway().playSound(sound);
//    }

//    setColor(color) {
//        this._getGateway().setColor(color);
//    }

    // ---------- private methods ----------
//    _findDevice(sid) {
//        return this.devices[sid] ? this.devices[sid] : null;


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

//    _createDevice(sid, model){
//        switch (model) {
//            default:
//                let device = new GenericDevice(sid, model);
//        }
//        return device;
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