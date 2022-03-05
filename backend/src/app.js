var express = require("express");
var bodyParser = require('body-parser')
var app = express();
const fs = require('fs');
const crypto = require('crypto');

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

try {
    let userFileData = fs.readFileSync("/tmp/users.json");
    userData = JSON.parse(userFileData);
} catch (error) {
    console.log("filen finns inte"); //TODO hantera felet, kolla i felet om filen inte finns eller om det är något annat fel
}

app.post("/reg", (req, res, next) => {
    let doesUserAlreadyExists = userData.find(user => user.email.toLowerCase() === req.body.email.toLowerCase());
    if (doesUserAlreadyExists) {
        return res.status(406).json({})
    } else {
        let encryptedPwd = crypto.createHash('md5').update('req.body.password').digest("hex");
        let user = {
            firstName: req.body.firstName,
            surName: req.body.surName,
            email: req.body.email,
            password: encryptedPwd
        };
        userData.push(user);
        fs.writeFile("/tmp/users.json", JSON.stringify(userData, null, 2), function (error) { //TODO lägg i try and catch
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