import express from "express"
var userRouter = express.Router();
import bodyParser from "body-parser";
import { UserT, User } from "../models/users.js";
import bcrypt from "bcrypt";


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
    console.log(user);
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
                        res.redirect("/");
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



export default userRouter;
