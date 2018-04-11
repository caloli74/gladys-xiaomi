module.exports = function (sails) {

    var Xiaomi = require('./lib/Xiaomi.js');

    gladys.on('ready', function(){
        var xiaomi = new Xiaomi('wkj8q0gi2nmaugth');
    });

    return {
    };
};