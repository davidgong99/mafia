const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req,res) {
    return res.send('pong');
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

//adds user to list of players
app.get('/user', function (req,res) {
    return res.send('add user');
})

//return user's individual role
app.get('/getrole', function (req,res) {
    return res.send('your role');
})

//return list of mafia
app.get('/mafia', function (req,res){
    return res.send('mafia');
})

//returns list of civilians
app.get('/civilians', function (req,res) {
    return res.send('civilians');
})

app.listen(process.envPORT || 8080);