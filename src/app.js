const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs') //Setting a view engine to run
app.set('views', viewsPath) //Settings Views Path/Location.
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir)) //For Static Html Paths for Static Websites.

app.get('', (req, res) => { // request and response
    res.render('index', {
        title:"Weather",
        name: "SurendiranS"
    }) // Name of the view to render
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name:"Surendiran.S"
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Please read the FAQ for the questions.",
        title: "Help",
        name: "Surendiran S"
    })
})

app.get('/weather', (req, res) => {
    const queryString = req.query;
    if (!queryString.address) {
        return res.send({
            errorMessage: "Address is mandatory"
        })
    }
    geocode(queryString.address, (error, {latitude: lat, longitude: long, place_name: placename} = {}) => { 
        //If the service returns the error, then variables will be undefined above. Instead we used default object to rectify the error
        if (error) {
            return res.send({
                error
            })
        }
        forecast(lat, long ,(error, {description, temp, feelslike} = {}) => {
            if (error) {
                return res.send({
                    error
                })
                return
            }
            res.send({
                forecast: 'The atmosphere in ' + placename + ' is ' + description + '. Actual temperature is ' + temp +' degrees. But it feels like '+ feelslike + ' degrees.',
                location: queryString.address
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    const queryString = req.query;
    if (!queryString.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name:"Surendiran S",
        message: "Help article not found"
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: "404",
        name: "Surendiran S",
        message: "404. Page Not found"
    })
})

app.listen(3000, () => {
    console.log("Application Started on Port 3000")
})