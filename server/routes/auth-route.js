const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

// router.post('/login', (req, res) => {
//     console.log("loginUser");

//     let login = async () => {
//         const { email, password } = req.body;
//         try {
//             if (!email || !password) {
//                 return res
//                     .status(400)
//                     .json({ errorMessage: "Please enter all required fields." });
//             }
//             const exist = await User.findOne({ email: email });
//             console.log("existingUser: " + exist);
//             if (!exist) {
//                 return res
//                     .status(401)
//                     .json({
//                         errorMessage: "Wrong email or password provided."
//                     })
//             }
//             console.log("provided password: " + password);
//             const passwordCorrect = await bcrypt.compare(password, exist.passwordHash);
//             console.log(passwordCorrect);
//             if (!passwordCorrect) {
//                 return res
//                     .status(401)
//                     .json({
//                         errorMessage: "Wrong email or password provided."
//                     })
//             }
//             else {
//                 const token = jwt.sign(
//                     {userID: exist._id},
//                     process.env.JWT_SECRET,
//                     { expiresIn: '1h' }
//                 )
//                 res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
//                 res.json({ message: 'Authentication successful' });
//                 return res
//                     .status(200)
//                     .json(
//                     {
//                         token,
//                         user: exist,
//                         loggedIn: true,
//                         error: null
//                     }
//                 )
//             }

//         } catch (err) {
//             console.error(err);
//         }
//     }
//     login()

// });

router.post('/login', async (req, res) => {
    console.log("loginUser");

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res.status(401).json({ errorMessage: "Wrong email or password provided." });
        }

        console.log("provided password: " + password);
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        console.log(passwordCorrect);
        if (!passwordCorrect) {
            return res.status(401).json({ errorMessage: "Wrong email or password provided." });
        }

        const token = jwt.sign({ userID: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
        return res.status(200).json({
            token,
            user: existingUser,
            loggedIn: true,
            error: null
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ errorMessage: "Internal server error" });
    }
});



// router.post('/logout', (req, res) => {
//     try {
//         res.clearCookie('token');
//         res.json({ message: 'Logged out successfully' });
//         res.send(
//             {
//                 user: null,
//                 loggedIn: false,
//                 error: null
//             })
//     } catch (err) {
//         res.send(err)
//     }
// });

router.post('/logout', (req, res) => {
    try {
        res.clearCookie('token');
        return res.json({ message: 'Logged out successfully', user: null, loggedIn: false, error: null });
    } catch (err) {
        return res.status(500).json({ errorMessage: "Internal server error" });
    }
});


//router.get('/loggedIn', AuthController.getLoggedIn)

module.exports = router