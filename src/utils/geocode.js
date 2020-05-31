const request = require('request')
const geocode = (address, callback) => {
    const gridURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3VyZW55YXMxOTAyIiwiYSI6ImNrYWJ5ZHRreDFiY3Iyc210dnRjbHB3Y2wifQ.kitN6lIZN2RDQv78GFQyaw&limit=1';
    request({url: gridURL, json: true}, (error,response) => {
        if (error) {
            callback("Unable to connect to geocode services.", undefined)
            return;
        }
        else if (response.body.features.length === 0) {
            callback("Unable to find location. Try again", undefined)
            return;
        }
        const data = response.body;
        const getCoordinates = data.features[0].center;
        const placename = data.features[0].place_name;
        const lat = getCoordinates[1];
        const long = getCoordinates[0];
        callback(undefined, {
            latitude: lat,
            longitude: long,
            place_name: placename
        })
    });
}

module.exports = geocode