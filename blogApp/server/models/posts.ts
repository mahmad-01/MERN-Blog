import mongoose, { Types } from "mongoose"
const Schema = mongoose.Schema;

export interface PostT extends mongoose.Document {
    author: Types.ObjectId,
    title: String,
    content: String,
    create_time: Date,
    category: Types.ObjectId,
}



export const PostSchema = new Schema<PostT>({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    create_time: { type: Date },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true }
});


PostSchema.virtual("url").get(function () {
    return `/post/${this._id}`;
})

export const Post = mongoose.model<PostT>("Post", PostSchema);
