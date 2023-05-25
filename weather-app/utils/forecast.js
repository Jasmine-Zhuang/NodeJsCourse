const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f13a610a76880170363a72b263cc580e&query='+latitude+','+longitude +'&units=m'
    request({ url: url, json: true }, (error, response) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if(response.body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
        }
    })
}
module.exports = forecast