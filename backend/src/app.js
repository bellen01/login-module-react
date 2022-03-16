const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const cors = require('cors');
const crypto = require('crypto');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
            lastName: req.body.lastName,
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
