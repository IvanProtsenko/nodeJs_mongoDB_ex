const express = require('express');
const app = express();
var bodyParser = require('body-parser')

app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

const MongoClient = require('mongodb').MongoClient  
const client = new MongoClient("mongodb://localhost:27017/");

app.use(bodyParser.urlencoded({
    extended: true
}));

client.connect((err, database) => {
    db = database.db("test");
    app.listen(3000, function () {})
})

app.get('/', (req, res) => {
    db.collection('users').find().toArray(function(err, result){
        if (err) { return console.log(err); }
        res.render('index.html', {users: result});
    })
})

app.post('/save', (req, res) => {
    db.collection('users').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);
        res.redirect('/');
    });
})