//Kod för att implementera mongo
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    surName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);


const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://bellen01:Cqn6KbLUy5FBrWh@cluster0.wtkif.mongodb.net/user?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => app.listen(3001)).catch((err) => console.log(err));

app.use(morgan('dev'));


//Gammal kod för att läsa till fil på datorn
//var express = require("express");
var bodyParser = require('body-parser')
var app = express();
const fs = require('fs');
const crypto = require('crypto');



app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

let userData = [];

try {
    let userFileData = fs.readFileSync("/tmp/users.json");
    userData = JSON.parse(userFileData);
} catch (error) {
    console.log(error);
    if (error.code === 'ENOENT') {
        console.log("Filen finns inte, den kommer skapas upp.");
    }
    //TODO hantera felet, kolla i felet om filen inte finns eller om det är något annat fel
}

function doesUserExist(loginData) {
    let encryptLoginPwd = crypto.createHash('md5').update(loginData.password).digest("hex");
    let doesEmailAndPwdMatch = userData.find(user => user.email.toLowerCase() === loginData.email.toLowerCase() && user.password === encryptLoginPwd);
    if (doesEmailAndPwdMatch) {
        console.log(doesEmailAndPwdMatch)
        return true;
    }
    console.log(doesEmailAndPwdMatch)
    return false;
}

app.post("/login", (req, res, next) => {
    if (doesUserExist(req.body)) {
        return res.status(200).json({})
    } else {
        return res.status(401).json({})
    }
})

app.post("/reg", (req, res, next) => {
    let doesUserAlreadyExists = userData.find(user => user.email.toLowerCase() === req.body.email.toLowerCase());
    if (doesUserAlreadyExists) {
        return res.status(406).json({})
    } else {
        let encryptedPwd = crypto.createHash('md5').update(req.body.password).digest("hex");
        let user = {
            firstName: req.body.firstName,
            surName: req.body.surName,
            email: req.body.email,
            password: encryptedPwd
        };
        userData.push(user);

        try {
            fs.writeFile("/tmp/users.json", JSON.stringify(userData, null, 2), function (error) {
                console.log("The file was saved, yay!")
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({});
        }
        res.json();
        console.log(req.body);
        console.log(req);
        console.log("userdata", userData);
    }
    // userData.find(userData.email === req.body.email);
    // for (let email of userData) {
    //     if (email === req.body.email) {
    //         return res.status(406).json({});
    //     } else {
    //         let user = [{
    //             firstName: req.body.firstName,
    //             surName: req.body.surName,
    //             email: req.body.email,
    //             password: req.body.password
    //         }];
    //         userData.push(user);
    //         res.json();
    //         console.log(req.body);
    //     }
    // }
});

//node js write to file och node js read file