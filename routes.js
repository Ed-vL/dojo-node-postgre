const express = require('express');
const router = express.Router();
const db = require('./dbconfig/dbConfig');

router.get('/', (req, res) => {   
    res.json({
        server: "Dojozada, apenas?"
    });
});

module.exports = router
