import mongoose from "mongoose";


mongoose.set("strictQuery", false);
const mongoDB = "mongodb://127.0.0.1/blogAPI";


export async function dbConnect() {
    mongoose
        .connect(
            mongoDB
        )
        .then(() => {
            console.log("Successfully connected to MongoDB!");
        })
        .catch((error) => {
            console.log("Unable to connect to MongoDB!");
            console.error(error);
        });
}
