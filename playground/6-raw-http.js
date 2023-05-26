const http = require('http')
const url = 'http://api.weatherstack.com/current?access_key=f13a610a76880170363a72b263cc580e&query=45, -75'
const request = http.request(url, (response) =>{
    let data = '' 
    response.on('data', (chunk) => {
        data = data + chunk.toString() //chunk is buffer
    })
    response.on('end', ()=>{ 
        const body = JSON.parse(data)
        console.log(body)
    })
})
request.on('error', (error) => {
    console.log('An error', error)
})
request.end()
