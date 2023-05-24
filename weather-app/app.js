const request = require('request')
// const url = 'http://api.weatherstack.com/current?access_key=f13a610a76880170363a72b263cc580e&query=37.8267,-122.4233&units=m'
// request({ url:url, json: true }, (error, response) => {
//     //in option, have json:true parse response for us
//     if(error){
//         console.log('Unable to connect to weather services!')
//     }else if(response.body.error){
//         console.log('Unable to find location')
//     }else{
//         console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
//     }
// })

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiamFzbWluZS14ZXJvIiwiYSI6ImNsaTBvdXB4dDAzcnEzZG85b2w3czF2cnoifQ.3gCgCqNQc-BRw7DNmGlQbQ&limit=1'
request({ url: geocodeURL, json: true }, (error, response) => {
    if(error){
        console.log('Unable to connect to location services!')
    }else if(response.body.features.length==0){
        console.log('Unable to find location. Try another search.')
    }else{
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        console.log('Longitude is: ' + longitude + ' Latitude is: ' + latitude)
    }
    
})

