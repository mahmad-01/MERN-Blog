import express from "express";
var catRouter = express.Router();
import bodyParser from "body-parser";
import { Category } from "../models/categories.js"

catRouter.use(bodyParser.json());
catRouter.use(bodyParser.urlencoded({ extended: true }));

catRouter.get("/getAllCategories", async (req, res, next) => {
    const categories = await Category.find().sort({ name: 1 }).exec();
    res.send(categories);
});

catRouter.get("/getCategory", async (req, res, next) => {
    const cat = await Category.findById(req.body._id)
    res.send(cat);
});

catRouter.post("/submitCategory", async (req, res) => {
    const cat = new Category({
        name: req.body.name
    })
    cat.save()
        .then((result) => {
            console.log("Category created", result)
            res.status(201).send({
                message: "Category Created Successfully",
                result,
            });
        })
        .catch((error) => {
            console.log("error", error.message)
            res.status(500).send({
                message: "Error creating category",
                error,
            });
        });
});

catRouter.post("/deleteCategory", async (req, res) => {
    const cat = Category.findById(req.body._id);
    cat.deleteOne()
        .then((result) => {
            console.log("Category Deleted!", result)
            res.status(201).send({
                message: "Category Deleted",
                result,
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Error deleting category",
                error,
            })
        })
})

catRouter.post("/updateCategory", async (req, res) => {
    const cat = {
        name: req.body.name,
        _id: req.body.id,
    }
    const updatedCat = await Category.findByIdAndUpdate(req.body._id, cat, {})
        .then((result) => {
            console.log("Category Updated!", result)
            res.status(201).send({
                message: "Category Updated",
                result,
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Error updating Category",
                error,
            })
        })
});

export default catRouter;
