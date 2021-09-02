const express = require('express');
const router = express.Router();
const db = require('./dbconfig/dbConfig');

router.get('/', (req, res) => {   
    res.json({
        server: "Dojozada, apenas?"
    });
});

router.post('/aluno', (req, res) =>{
    var body = req.body;

    console.log(req.body)
    
    res.status = 200

    db.query("INSERT INTO ALUNO(name) VALUES ($1) RETURNING *", [body.name]).then( response => res.json({"created": response.rows}))
    
})

router.get('/aluno/:alunoId', (req, res) => {

    response = db.query("SELECT a.name AS nome FROM ALUNO as a WHERE alunoId=$1", [req.params.alunoId]).then(response => {
      res.json(response.rows)
    })

})

module.exports = router
