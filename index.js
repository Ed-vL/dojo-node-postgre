const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const router = require('./routes')

var app = express()
app.use(cors())

//app.get('/', function (req, res) {
//  res.send('hello world')
//})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/routes', router)
//require('./routes')(app);
//router(app)

app.listen(3000)
