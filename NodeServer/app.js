const express = require('express');
const app = express();
const mongoose = require('mongoose');
const albumsRoute = require('./routes/albums')
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/albums', albumsRoute);

app.get('/', (req, res) => {
    res.send('We are on home');
});

dbURL = 'mongodb://localhost:27017/WebTech2'

mongoose.connect(dbURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Connected to database: " + dbURL);
});

var server = app.listen(3000, () =>{
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});
