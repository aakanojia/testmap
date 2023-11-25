const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt');
// const cors = require('cors');

// router.use(cors());

router.post('/register', (req, res) => {
    let reg = async () => {
        try {
            const { username, email, password, passwordVerify } = req.body;

            if (!username || !email || !password || !passwordVerify) {
                return res
                    .status(400)
                    .json({ errorMessage: "Please enter all required fields." });
            }
            console.log("all fields provided");
            if (password.length < 8) {
                return res
                    .status(400)
                    .json({
                        errorMessage: "Please enter a password of at least 8 characters."
                    });
            }
            console.log("password long enough");
            if (password !== passwordVerify) {
                return res
                    .status(400)
                    .json({
                        errorMessage: "Please enter the same password twice."
                    })
            }
            console.log("password and password verify match");
            const existingUser = await User.findOne({ email: email });
            console.log("existingUser: " + existingUser);
            if (existingUser) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        errorMessage: "An account with this email address already exists."
                    })
            }
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const passwordHash = await bcrypt.hash(password, salt);

            const userID = Date.now();
            const newUser = new User({
                userID, username, email, passwordHash
            });
            const savedUser = await newUser.save();
            console.log("new user saved: " + savedUser._id);

            return res
                .status(200)
                .json({
                    success: true
                })

        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    }
    reg()
});

router.post('/login', (req, res) => {
    console.log("loginUser");

    let login = async () => {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ errorMessage: "Please enter all required fields." });
            }
            const exist = await User.findOne({ email: email });
            console.log("existingUser: " + exist);
            if (!exist) {
                return res
                    .status(401)
                    .json({
                        errorMessage: "Wrong email or password provided."
                    })
            }
            console.log("provided password: " + password);
            const passwordCorrect = await bcrypt.compare(password, exist.passwordHash);
            console.log(passwordCorrect);
            if (!passwordCorrect) {
                return res
                    .status(401)
                    .json({
                        errorMessage: "Wrong email or password provided."
                    })
            }
            else {
                return res
                    .status(200)
                    .json(
                    {
                        user: exist,
                        loggedIn: true,
                        error: null
                    }
                )
            }

        } catch (err) {
            console.error(err);
        }
    }
    login()

});


router.post('/logout', (req, res) => {
    try {
        res.send(
            {
                user: null,
                loggedIn: false,
                error: null
            })
    } catch (err) {
        res.send(err)
    }
});

//router.get('/loggedIn', AuthController.getLoggedIn)

module.exports = router