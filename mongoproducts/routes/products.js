var express = require("express");
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
var db;

MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}, (err, database) => {
    if (err) return console.log(err);
    db = database.db('products')
})

    router.get('/', (req, res) => {
        db.collection('items').find().toArray((err, result) => {
            if (err) return
            res.json(result)
        })
    })

    router.post('/searchOne', (req, res) => {
        var query = {name : req.body.name}
        db.collection('items').find(query).toArray((err, result) => {
            if (err) return
            res.json(result)
        })
    })

    router.post('/searchAll', (req, res) => {
        var query = {name : new RegExp('^' + req.body.name)}
        db.collection('items').find(query).toArray((err, result) => {
            if (err) return
            res.json(result)
        })
    })

    router.post('/add', (req, res) => {
        db.collection('items').insertOne(req.body, function (err, result) {
            res.json('{"Success" : "ok"}')
        })
    })

    router.delete('/delete/:name', (req, res) => {
        db.collection('items').findOneAndDelete({name: req.params.name})
        res.json('{"Success" : "ok"}')
        //hallo
    })

    router.post('/edit', (req, res) =>{
        console.log(req.body)
        db.collection('items').replaceOne({name: req.body.name}, req.body)
        res.json('{"Success" : "ok"}')
    })


module.exports = router;