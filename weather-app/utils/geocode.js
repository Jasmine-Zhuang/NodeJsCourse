const request = require('request')
const geocode = (address, callback) =>{ 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamFzbWluZS14ZXJvIiwiYSI6ImNsaTBvdXB4dDAzcnEzZG85b2w3czF2cnoifQ.3gCgCqNQc-BRw7DNmGlQbQ&limit=1'
    request({ url, json:true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(body.features.length==0){
            
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].text
            })
        }
    })
}
module.exports = geocode