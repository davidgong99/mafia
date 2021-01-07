import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';

// importing routes
import indexRouter from './server/routes/index.js'
import userRouter from './server/routes/user.js'

import User from './server/models/User.js'


const app = express();
// app.use(express.static(path.join(__dirname, 'build')));

app.use(logger("dev"))
app.options('*', cors()) // include before other routes
/** Get port from environment and store in Express. */
const port = process.env.PORT || "8080";
app.set("port", port);

const JSONparser = bodyParser.json();
app.options('*', cors());



function find(user) {
    for (var i in users) {
        if (users[i].name === user) {
            return true;
        }
    }
    return false;
}

var users = [];

console.log("I'M NOT LOADING I'M DONE!");


app.use("/", indexRouter);
app.use("/users", userRouter)


app.get('/ping', function (req,res) {
    return res.send('pong');
})

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// })

app.get('/user', function (req,res) {
    console.log("GET /user");
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    var nameList = [];
    for (var i in users){
        nameList.push(users[i].name);
    }
    return res.send(JSON.stringify({"users": nameList}));
    // return res.send(JSON.stringify(nameList));
})

app.put('/user', JSONparser, function (req,res){
    var payload;
    if (!find(req.body.oldName)){
        payload = {
            "response": "User does not exist",
            "responseCode": "404"
        };
        return res.send(JSON.stringify(payload));
    }
        for (var i in users) {
            if (users[i].name === req.body.oldName) {
                users[i] = new User(req.body.newName, false);
                payload = {
                    "response": "User updated",
                    "responseCode":"200"
                };
                return res.send(JSON.stringify(payload));
            }
        }
})

app.post('/user', JSONparser, function (req,res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    var payload;
    if (find(req.body.name)){
        payload = {
            "response": "User already exists",
            "responseCode": "422"
        };
        return res.send(JSON.stringify(payload));
    }
    users.push(new User(req.body.name, false));
    payload = {
        "response": "User added",
        "responseCode":"200"
    };
    return res.send(JSON.stringify(payload));
    
})

app.delete('/user', JSONparser, function (req,res) {
    var payload;
    if (!find(req.body.name)){
        payload = {
            "response": "User does not exist",
            "responseCode": "404"
        };
        return res.send(JSON.stringify(payload));
    }
    for (var i in users){
        if (users[i].name === req.body.name){
            users.splice(i,1);
            break;
        }
    }
    payload = {
        "response": "User deleted",
        "responseCode":"200"
    };
    return res.send(JSON.stringify(payload));
})

app.post('/ready', JSONparser, function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    var payload;
    if (!find(req.body.name)){
        payload = {
            "response": "User does not exist",
            "responseCode": "404"
        };
        return res.send(JSON.stringify(payload));
    }
    for (var i in users){
        if (users[i].name === req.body.name){
            users[i].status = true;
        }
    }
    payload = {
        "response":"Player ready",
        "responseCode":"200"
    };
    return res.send(JSON.stringify(payload));
})

app.post('/startgame', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    var payload
    for (var i in users){
        if (users[i].status === false){
            payload = {
                "response": "Not all players are ready",
                "responseCode": "400"
            };
            return res.send(JSON.stringify(payload));

        }
    }
    payload = {
        "response":"Start Game",
        "responseCode":"200"
    };
    return res.send(JSON.stringify(payload));
    
})

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
    return res.status(404).json({
      success: false,
      message: 'API endpoint doesnt exist'
    })
});


app.listen(port);

app.on("listening", () => {
    console.log(`Listening on : http://localhost:${port}/`)
})

