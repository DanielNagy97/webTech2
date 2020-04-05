const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');	

const config = require('config');
mongoose.set('useCreateIndex', true);

if (!config.get('PrivateKey')) {
    console.error('FATAL ERROR: PrivateKey is not defined.');
    process.exit(1);
}

const artistsRoute = require('./routes/artists');
const albumsRoute = require('./routes/albums');
const copiesRoute = require('./routes/copies')
const users = require('./routes/users');
const auth = require('./routes/auth');

app.use(cors());
app.use(bodyParser.json());

app.use('/artists', artistsRoute);
app.use('/albums', albumsRoute);
app.use('/copies', copiesRoute);

app.use('/users', users);
app.use('/auth', auth);

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

var server = app.listen(9000, () =>{
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});
