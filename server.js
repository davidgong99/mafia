const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.options('*', cors()) // include before other routes


const JSONparser = bodyParser.json();

var users = [];

console.log("I'M NOT LOADING I'M DONE!");

app.get('/ping', function (req,res) {
    return res.send('pong');
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.get('/user', function (req,res) {
    console.log("GET /user");
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');


    return res.send(JSON.stringify({ "users": users}));
})

app.put('/user', JSONparser, function (req,res){
    if (!find(req.body.oldName)){
        throw new Error(req.body.oldName + ' not found in user list');
    }
        for (var i in users) {
            if (users[i] === req.body.oldName) {
                users[i] = req.body.newName;
                return res.send(req.body.oldName + ' updated to ' + req.body.newName);
            }
        }
})

app.post('/user', JSONparser, function (req,res) {
    console.log("POST /user")
    if (find(req.body.name)) {
        var payloadErr = {
            "response": "Name already exists " + req.body.name,
            "responseCode": 400
        }
        
        return res.send(JSON.stringify(payloadErr));
        // throw new Error('User already exists');
    }
    
    console.log("pushing username on POST");
    users.push(req.body.name);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    var payload = {
        "response": "added user " + req.body.name,
        "responseCode": 200
    }
    
    return res.send(JSON.stringify(payload));
    
})

app.delete('/user', function (req,res) {
    return res.send('delete user');
})

function find(user) {
    for (var i in users) {
        if (users[i] === user) {
            return true;
        }
    }
    return false;
}


app.listen(process.envPORT || 8080);