const express = require('express');
const app = express();
const mongoose = require('mongoose');
const albumsRoute = require('./routes/albums')
const artistsRoute = require('./routes/artists')
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('We are on home');
});
app.use('/albums', albumsRoute);
app.use('/artists', artistsRoute);

dbURL = 'mongodb://localhost:27017/WebTech2'
mongoose.connect(dbURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Connected to database: " + dbURL);
});

var server = app.listen(9000, () =>{
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});
