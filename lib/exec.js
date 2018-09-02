var shared = require('./shared.js');
module.exports = function exec(params) {

    return new Promise(function (resolve, reject) {
        gladys.deviceType.getByDevice({ id: params.deviceType.device })
            .then((results) => {
                // load current colors & state
                var color = { r: 0, g: 0, b: 0 };
                var intensity = 0;
                var onoff = 0;
                for (var subDevice of results) {
                    if (subDevice.lastValue) {
                        switch (subDevice.type) {
                            case 'intensity':
                                intensity = subDevice.lastValue;
                                break;
                            case 'red':
                                color.r = subDevice.lastValue;
                                break;
                            case 'green':
                                color.g = subDevice.lastValue;
                                break;
                            case 'blue':
                                color.b = subDevice.lastValue;
                                break;
                            case 'binary':
                                onoff = subDevice.lastValue;
                                break;
                        }
                    }
                }

                if ((params.deviceType.type === 'binary' && params.state.value === 1) ||
                    (params.deviceType.type !== 'binary' && onoff === 1)) {
                    shared.xiaomi.setColor(color, intensity);
                }
                return resolve('success');
            })
            .catch((err) => {
                return reject(new Error(err));
            });
    })
}