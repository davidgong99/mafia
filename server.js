const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

const JSONparser = bodyParser.json();

var users = [];

app.get('/ping', function (req,res) {
    return res.send('pong');
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.get('/user', function (req,res) {
    return res.send(JSON.stringify(users));
})

app.put('/user', JSONparser, function (req,res){
    if (!find(req.body.oldName)){
        throw new Error(oldName + ' not found in user list');
    }
        for (var i in users) {
            if (users[i] == req.body.oldName) {
                users[i] = req.body.newName;
                return res.send(req.body.oldName + ' updated to ' + req.body.newName);
            }
        }
})

app.post('/user', JSONparser, function (req,res) {
    if (find(req.body.name)) {
        throw new Error('User already exists');
    }
    users.push(req.body.name);
    return res.send('added user: '+ req.body.name);
    
})

app.delete('/user', function (req,res) {
    return res.send('delete user');
})

function find(user) {
    for (var i in users) {
        if (users[i] == user) {
            return true;
        }
    }
    return false;
}


app.listen(process.envPORT || 8080);