const path = require('path')
const express = require('express')

const app = express()
//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jasmine Z'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Jasmine Z'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'FAQ'
    })
})

app.get('/weather', (req, res)=>{
    res.send([{forecast:'It is sunny', location:'Toronto'}])
})

app.listen(3000, ()=> {
    console.log('Server is up on port 3000.')
})