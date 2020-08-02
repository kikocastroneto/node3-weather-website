const request = require('request');

function forecast(lat, lon, callback) {

    // make the dynamic url
    const url = `http://api.weatherstack.com/current?access_key=7e8f8794d53cf760f38378ed43787f3e&query=${lat},${lon}`;

    // make the request and use the callback function
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) {
            callback(body.error.info, undefined);
        }
        else {
            callback(undefined, `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. Information checked at ${body.current.observation_time}`);
        }
    })
}

// export the forecast function
module.exports = forecast;