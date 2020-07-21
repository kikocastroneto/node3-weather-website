const request = require('request');

function geocode(address, callback) {

    // dynamic url based on address variable
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia2lrb2Nhc3Ryb25ldG8iLCJhIjoiY2thOHNxY3dpMDk3NTJ4cWZ3dWxrZDd4MiJ9.lXS9DNtojd6aMjCsvWuvBg&limit=1`;

    // make the request and use the callback function
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocode service!', undefined);
        } else if (body.features.length === 0) {
            callback('No result found!', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            });
        }
    })
}

// export geocode function
module.exports = geocode;