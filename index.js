const express = require('express');
const cors = require('cors');
const router = require('./routes')

var app = express()
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/routes', router)

app.listen(3000)
