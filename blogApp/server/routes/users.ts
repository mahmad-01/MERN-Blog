import express from "express";
var userRouter = express.Router();
import bodyParser from "body-parser";
import { User } from "../models/users.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import passportLocal from "passport-local";
import session from "express-session";


const LocalStrategy = passportLocal.Strategy;
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));

/* GET users listing. */
userRouter.get('/', function (req, res, next) {
    return res.send("USERS");
});

/* router.get("/auth-endpoint", auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
}); */

userRouter.post("/signup", async (req, res) => {
    var user = await User.findOne({ username: req.body.username });
    if (user) {
        return res.status(400).send({ message: "User already exists" });
    }
    else {
        bcrypt.hash(req.body.password, 10)
            .then((hashedPassword) => {
                const newUser = new User({
                    username: req.body.username,
                    password: hashedPassword,
                });
                newUser.save()
                    .then((result) => {
                        console.log("user created", result)
                        res.status(201).send({
                            message: "User Created Successfully",
                            result,
                        });
                    })
                    .catch((error) => {
                        console.log("error", error.message)
                        res.status(500).send({
                            message: "Error creating user",
                            error,
                        });
                    });

            })
            .catch((e) => {
                res.status(500).send({
                    message: "Password was not hashed successfully",
                    e,
                });
            });
    }
})


userRouter.post("/log-in", async function name(req, res) {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        const verif = bcrypt.compare(req.body.password, user.password);
        if (verif) {
            res.redirect("/");
            res.send(true);
        }
    }
    else {
        res.send(false);
    }
}
);

userRouter.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
userRouter.use(passport.initialize());
userRouter.use(passport.session());
userRouter.use(express.urlencoded({ extended: false }));

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            };
            if (user.password !== password) {
                return done(null, false, { message: "Incorrect password" });
            };
            return done(null, user);
        } catch (err) {
            return done(err);
        };
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    };
});




export default userRouter;
