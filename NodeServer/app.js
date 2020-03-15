const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');	

const config = require('config');
const expressjwt = require("express-jwt");
mongoose.set('useCreateIndex', true);

const albumsRoute = require('./routes/albums');
const artistsRoute = require('./routes/artists');
const users = require('./routes/users');
const auth = require('./routes/auth');

if (!config.get('PrivateKey')) {
    console.error('FATAL ERROR: PrivateKey is not defined.');
    process.exit(1);
}

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('We are on home');
});

app.use('/albums', albumsRoute);
app.use('/artists', artistsRoute);
app.use('/users', users);
app.use('/auth', auth);


//logged in route
const jwtCheck = expressjwt({    
    secret: config.get('PrivateKey')
});
app.get("/secret", jwtCheck, (req, res) => {
    res.status(200).send("Only logged in people can see me");
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

var server = app.listen(9000, () =>{
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});
