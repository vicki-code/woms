
const router = require("express").Router();
const User = require("../models/User");
const UserRoles = require("../models/UserRoles");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
    const user = await User.findOne(
        {
            email: req.body.email
        }
    );
    
    if (user) {
        res.status(401).json({error:"This user already exists"});
            return
    }

    const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: CryptoJS.HmacSHA256(
            req.body.password,
            process.env.PASS_KEY
        ).toString(),
        role: UserRoles.USER
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:err});
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne(
            {
                email: req.body.email
            }
        );

        let wrongUserOrPwd = false;
        if (!user) {
            wrongUserOrPwd = true;
        } else {
            const hashedPassword = CryptoJS.HmacSHA256(
                req.body.password,
                process.env.PASS_KEY
            );

            wrongUserOrPwd = user.password != hashedPassword
        }

        if (wrongUserOrPwd) {
            res.status(401).json({error:"Incorrect user name or password"});
            return
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_KEY,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        console.log(err);
        res.status(500).json({error:err});
    }

});

router.post('/logout', function (req, res) {
    res.status(200).json({
        status: 'Logged out'
    });
});

module.exports = router;