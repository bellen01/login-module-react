//Kod för att implementera mongo
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const cors = require('cors');
const crypto = require('crypto');

const app = express();

app.use(cors()); //TODO kolla om detta fungerar
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

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

//connect to mongoDB
const dbURI = 'mongodb+srv://bellen01:Cqn6KbLUy5FBrWh@cluster0.wtkif.mongodb.net/User?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('Connected to DB'))
    .catch((err) => console.log(err));



app.post("/reg", async (req, res, next) => {
    let emailLowerCase = req.body.email.toLowerCase();
    let isEmailAlreadyRegistered = await User.exists({ email: emailLowerCase });
    if (isEmailAlreadyRegistered) {
        console.log("Email is already registered")
        return res.status(406).json({})
    } else {
        let encryptedPwd = crypto.createHash('md5').update(req.body.password).digest("hex");
        const userData = new User({
            firstName: req.body.firstName,
            surName: req.body.surName,
            email: emailLowerCase,
            password: encryptedPwd
        });

        try {
            const savedUser = userData.save();
            res.json(savedUser);
        } catch (error) {
            res.status(401).json({ message: error });
        }
    }
});

async function doesUserExist(loginData) {
    let encryptLoginPwd = crypto.createHash('md5').update(loginData.password).digest("hex");
    let doesEmailAndPwdMatch = await User.findOne({ email: loginData.email.toLowerCase(), password: encryptLoginPwd })
    return doesEmailAndPwdMatch;
    // if (doesEmailAndPwdMatch) {
    //     console.log('true', doesEmailAndPwdMatch)
    //     return true;
    // }
    // console.log('false', doesEmailAndPwdMatch)
    // return false;
}

app.post("/login", async (req, res, next) => {
    const userData = await doesUserExist(req.body);
    if (userData) {
        console.log('ya');
        return res.status(200).json({ firstName: userData.firstName })
    } else {
        console.log('no');
        return res.status(401).json({})
    }
})

app.listen(3001);




/////////////////////////////Gammal kod för att läsa till fil på datorn/////////////////////////////////////

//var express = require("express");
//var bodyParser = require('body-parser')
//var app = express();
// const fs = require('fs');
// const crypto = require('crypto');



//app.use(bodyParser.urlencoded({ extended: false }));

//app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "*");
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({})
//     }
//     next();
// });

// app.listen(3001, () => {
//     console.log("Server running on port 3001");
// });

// let userData = [];

// try {
//     let userFileData = fs.readFileSync("/tmp/users.json");
//     userData = JSON.parse(userFileData);
// } catch (error) {
//     console.log(error);
//     if (error.code === 'ENOENT') {
//         console.log("Filen finns inte, den kommer skapas upp.");
//     }
//     //TODO hantera felet, kolla i felet om filen inte finns eller om det är något annat fel
// }

// function doesUserExist(loginData) {
//     let encryptLoginPwd = crypto.createHash('md5').update(loginData.password).digest("hex");
//     let doesEmailAndPwdMatch = userData.find(user => user.email.toLowerCase() === loginData.email.toLowerCase() && user.password === encryptLoginPwd);
//     if (doesEmailAndPwdMatch) {
//         console.log(doesEmailAndPwdMatch)
//         return true;
//     }
//     console.log(doesEmailAndPwdMatch)
//     return false;
// }

// app.post("/login", (req, res, next) => {
//     if (doesUserExist(req.body)) {
//         return res.status(200).json({})
//     } else {
//         return res.status(401).json({})
//     }
// })

// app.post("/reg", (req, res, next) => {
//     let doesUserAlreadyExists = userData.find(user => user.email.toLowerCase() === req.body.email.toLowerCase());
//     if (doesUserAlreadyExists) {
//         return res.status(406).json({})
//     } else {
//         let encryptedPwd = crypto.createHash('md5').update(req.body.password).digest("hex");
//         let user = {
//             firstName: req.body.firstName,
//             surName: req.body.surName,
//             email: req.body.email,
//             password: encryptedPwd
//         };
//         userData.push(user);

//         try {
//             fs.writeFile("/tmp/users.json", JSON.stringify(userData, null, 2), function (error) {
//                 console.log("The file was saved, yay!")
//             })
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({});
//         }
//         res.json();
//         console.log(req.body);
//         console.log(req);
//         console.log("userdata", userData);
//     }
// });
