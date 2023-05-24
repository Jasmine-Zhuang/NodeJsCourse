const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
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

// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiamFzbWluZS14ZXJvIiwiYSI6ImNsaTBvdXB4dDAzcnEzZG85b2w3czF2cnoifQ.3gCgCqNQc-BRw7DNmGlQbQ&limit=1'
// request({ url: geocodeURL, json: true }, (error, response) => {
//     if(error){
//         console.log('Unable to connect to location services!')
//     }else if(response.body.features.length==0){
//         console.log('Unable to find location. Try another search.')
//     }else{
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log('Longitude is: ' + longitude + ' Latitude is: ' + latitude)
//     } 
// })

// geocode('Toronto',(error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


forecast(37.8267, 44.1545, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })