const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// PORT for heroku or 3000 for local
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials");

// template renderer with handlebars
app.set('view engine', 'hbs');

// template folder path
app.set("views", viewsPath);

// register partials directory
hbs.registerPartials(partialsPath);

// set the public directory to use static files
app.use(express.static(publicDir))

// render index.hbs with context object
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Frederico Castro'
    });
})

// render about.hbs with context object
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Frederico Castro',
    });
});

// render about.hbs with context object
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is your help message!',
        title: 'Help',
        name: 'Frederico Castro'
    })
})

app.get('/weather', (req, res) => {

    // check if location address was supplied in http address
    if (!req.query.address) {

        return res.send({
            error: "You must provide an andress!",
        })

    } else {

        // execute the geocode with specific address
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

            // if error during geocode call, return the error
            if (error) {
                return res.send({ error });
            } else {
                forecast(latitude, longitude, (error, forecastData) => {

                    // if error during forecast call, return the error
                    if (error) {
                        return res.send({ error });
                    } else {
                        return res.send({
                            location: location,
                            forecast: forecastData,
                            address: req.query.address,
                        })
                    }
                })
            }
        })
    }
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Error Help",
        name: "Frederico Castro",
        message: "Help article not found"
    });
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "Error",
        name: "Frederico Castro",
        message: "My 404 page"
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});