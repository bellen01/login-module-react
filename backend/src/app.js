const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const cors = require('cors');
const crypto = require('crypto');

const app = express();


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


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post("/reg", async (req, res) => {
    const emailLowerCase = req.body.email.toLowerCase();
    const isEmailAlreadyRegistered = await User.exists({ email: emailLowerCase });
    if (isEmailAlreadyRegistered) {
        console.log("Email is already registered")
        return res.status(406).json({})
    } else {
        const encryptedPwd = crypto.createHash('md5').update(req.body.password).digest("hex");
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
    const encryptLoginPwd = crypto.createHash('md5').update(loginData.password).digest("hex");
    const findUser = await User.findOne({ email: loginData.email.toLowerCase(), password: encryptLoginPwd })
    return findUser;
}

app.post("/login", async (req, res) => {
    const userData = await doesUserExist(req.body);
    if (userData) {
        console.log(`Användare inloggad: ${userData.email}`);
        return res.status(200).json({ firstName: userData.firstName })
    } else {
        console.log('Felaktig inloggning');
        return res.status(401).json({})
    }
})

app.listen(3001);
