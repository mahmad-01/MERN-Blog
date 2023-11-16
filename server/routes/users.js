var express = require('express');
var router = express.Router();
const User = require("../models/users.js");

/* GET users listing. */
router.get('/', function (req, res, next) {
    return res.send("USERS");
});


router.post("/sign-up", async (req, res, next) => {
    try {
        user = await User.exists({ "username": req.body.username });
        if (user) {
            return res.status(400).send({ message: "User already exists" });
        }
        else {
            const user = new User({
                username: req.body.username,
                password: req.body.password
            });
            const result = await user.save();
            res.redirect("/");
        };
    } catch (err) {
        return next(err);
    };
});



module.exports = router;
