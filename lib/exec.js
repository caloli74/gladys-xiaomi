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

                // set color if the device is turn on, or if it will be
                // update color to set with the new value
                if ((params.deviceType.type === 'binary' && params.state.value === 1) ||
                    (params.deviceType.type !== 'binary' && onoff === 1)) {
                        switch (params.deviceType.type) {
                            case 'intensity':
                            intensity = params.state.value;
                            break;
                        case 'red':
                            color.r = params.state.value;
                            break;
                        case 'green':
                            color.g = params.state.value;
                            break;
                        case 'blue':
                            color.b = params.state.value;
                            break;
                        }
                    shared.xiaomi.setColor(color, intensity);
                }

                return resolve('success');

            })
            .catch((err) => {
                return reject(new Error(err));
            });
    })
}