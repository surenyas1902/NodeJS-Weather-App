const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c5f720cf5f8eb1da3a43be7a606b7e03&query='+ lat+ ',' + long +'&units=f';
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to weather services.", undefined)
            return;
        } else if (response.body.success === false) {
            callback("Invalid Geo Coordinates", undefined)
            return;
        }
        const current = response.body.current;
        callback(undefined, {
            description: current.weather_descriptions[0],
            temp: current.temperature,
            feelslike: current.feelslike
        })
    });
}

module.exports = forecast;