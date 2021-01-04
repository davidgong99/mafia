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

app.get('/user', function (req,res) {
    return res.send('user list');
})

app.put('/user', function (req,res){
    return res.send('update user')
})

app.post('/user', function (req,res) {
    return res.send('add user');
})

app.delete('/user', function (req,res) {
    return res.send('delete user')
})


app.listen(process.envPORT || 8080);