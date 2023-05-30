const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f13a610a76880170363a72b263cc580e&query='+latitude+','+longitude +'&units=m'
    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The uv-index is ' + body.current.uv_index + '.' )
        }
    })
}
module.exports = forecast