import express from "express";
var postRouter = express.Router();
import bodyParser from "body-parser";
import { Post } from "../models/posts.js";


postRouter.use(bodyParser.json());
postRouter.use(bodyParser.urlencoded({ extended: true }));

postRouter.get("/getAllPosts", async (req, res, next) => {
    const blogPosts = await Post.find().sort({ create_time: 1 }).populate("author").populate("category").exec();
    res.send(blogPosts);
});

postRouter.get("/getPost", async (req, res, next) => {
    const post = await Post.findById(req.body._id)
    res.send(post)
});

postRouter.post("/submitPost", async (req, res) => {
    const post = new Post({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        create_time: new Date(),
        category: req.body.category,
    })
    post.save()
        .then((result) => {
            console.log("post created", result)
            res.status(201).send({
                message: "Post Created Successfully",
                result,
            });
        })
        .catch((error) => {
            console.log("error", error.message)
            res.status(500).send({
                message: "Error creating post",
                error,
            });
        });
});

postRouter.post("/deletePost", async (req, res) => {
    const post = Post.findById(req.body._id);
    post.deleteOne()
        .then((result) => {
            console.log("Post Deleted!", result)
            res.status(201).send({
                message: "Post Deleted",
                result,
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Error deleting post",
                error,
            })
        })
})

postRouter.post("/updatePost", async (req, res) => {
    const post = {
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        create_time: req.body.create_time,
        category: req.body.category,
        _id: req.body.id,
    }
    const updatedPost = await Post.findByIdAndUpdate(req.body._id, post, {})
        .then((result) => {
            console.log("Post Updated!", result)
            res.status(201).send({
                message: "Post Updated",
                result,
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Error updating post",
                error,
            })
        })
});

export default postRouter;
