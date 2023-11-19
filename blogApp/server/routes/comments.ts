import express from "express";
var commentRouter = express.Router();
import bodyParser from "body-parser";
import { Post } from "../models/posts.js";
import { Comment } from "../models/comments.js"


commentRouter.use(bodyParser.json());
commentRouter.use(bodyParser.urlencoded({ extended: true }));

commentRouter.get("/getAllComments", async (req, res, next) => {
    const comments = await Comment.find({ "post_id": req.body._id }).populate("author").exec();
    res.send(comments);
});

commentRouter.get("/getComment", async (req, res, next) => {
    const comment = await Comment.findById(req.body._id)
    res.send(comment)
});

commentRouter.post("/submitComment", async (req, res) => {
    const comment = new Comment({
        author: req.body.author,
        content: req.body.content,
        create_time: new Date(),
        post_id: req.body.post_id,
    })
    comment.save()
        .then((result) => {
            console.log("comment created", result)
            res.status(201).send({
                message: "Comment Created Successfully",
                result,
            });
        })
        .catch((error) => {
            console.log("error", error.message)
            res.status(500).send({
                message: "Error creating comment",
                error,
            });
        });
});

commentRouter.post("/deleteComment", async (req, res) => {
    const comment = Comment.findById(req.body._id);
    comment.deleteOne()
        .then((result) => {
            console.log("Comment Deleted!", result)
            res.status(201).send({
                message: "Comment Deleted",
                result,
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Error deleting comment",
                error,
            })
        })
})

commentRouter.post("/updateComment", async (req, res) => {
    const comment = {
        author: req.body.author,
        content: req.body.content,
        create_time: req.body.create_time,
        post_id: req.body.post_id,
        _id: req.body.id,
    }
    const updatedComment = await Comment.findByIdAndUpdate(req.body._id, comment, {})
        .then((result) => {
            console.log("Comment Updated!", result)
            res.status(201).send({
                message: "Comment Updated",
                result,
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Error updating comment",
                error,
            })
        })
});

export default commentRouter;
