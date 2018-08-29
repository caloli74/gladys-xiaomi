const events = require('events');
const dgram = require('dgram');
const schedule = require('node-schedule');
const GenericDevice = require('./devices/GenericDevice.js');
const Gateway = require('./devices/Gateway.js');
//const Button = require('./devices/Button.js');
//const Temperature = require('./devices/Temperature.js');

const DISCOVERY_PORT = 4321;
const SERVER_PORT = 9898;
const MULTICAST_ADDRESS = '224.0.0.50';

module.exports = class Xiaomi extends events.EventEmitter {
    
    constructor() {
        super();
        this.devices = {};

        this.socket = dgram.createSocket({ type: 'udp4', reuseAddr: true });
        this.socket.on('listening', this.onListening.bind(this));
        this.socket.on('message', this.onMessage.bind(this));
        this.socket.bind(SERVER_PORT);
    }

    onListening() {
        this.socket.setBroadcast(true);
        this.socket.addMembership(MULTICAST_ADDRESS, '127.0.0.1');
        this.sendSocket({ cmd: "whois" });
    }

    onMessage(msg) {
        console.log('xioami msg ' + (new Date).toLocaleTimeString() + ' : ' + msg.toString());

        let message = JSON.parse(msg.toString());
        let device = this._findDevice(message.sid);

        // create device if not already exists
        if (!device)
        {
            console.log('creation du device ' + message.model + ' ' + message.sid)
            this.devices[message.sid] = this._createDevice(message.sid, message.model);
        }
            
        console.log("model = " + this.devices[message.sid].model) ;

        // transmit message to device
        this.devices[message.sid].deviceMessage(message);

//        if (message.cmd == 'iam' || message.cmd == 'heartbeat' || message.cmd == 'report' || message.cmd.indexOf('_ack') != -1) {
//            var device = this._findDevice(message);
//            this.devices[device].onMessage(message);
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
    _findDevice(sid) {
        return this.devices[sid] ? this.devices[sid] : null;


//        for (var i = 0; i < this.devices.length; i++) {
//            if (this.devices[i].sid == message.sid) {
//                return i;
//                break;
//            }
//        }
//
//        this.devices.push(this._recordDevice(message.sid, message.model));
//        return this.devices.length - 1;
    }

    _createDevice(sid, model){
        var device;
        switch (model) {
            case 'gateway':
                device = new Gateway(sid, model, this);
                break
            default:
                device = new GenericDevice(sid, model);
        }
        return device;
    }


//    _recordDevice(sid, model) {
//        switch (model) {
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