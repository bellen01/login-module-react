var express = require("express");
var bodyParser = require('body-parser')
var app = express();
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "*"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

app.get("/url", (req, res, next) => {
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

let userData = [];

app.post("/reg", (req, res, next) => {
    let userAlreadyExists = userData.find(user => user.email === req.body.email);
    if (userAlreadyExists) {
        return res.status(406).json({})
    } else {
        let user = {
            firstName: req.body.firstName,
            surName: req.body.surName,
            email: req.body.email,
            password: req.body.password
        };
        userData.push(user);
        fs.writeFile("/tmp/users.json", JSON.stringify(userData, null, 2), function (error) {
            if (error) {
                return console.log(error);
            }
            console.log("The file was saved, yay!")
        });
        res.json();
        console.log(req.body);
        console.log(userData);
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