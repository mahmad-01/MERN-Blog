import mongoose, { Types } from "mongoose"
const Schema = mongoose.Schema;

export interface CommentT extends mongoose.Document {
    author: Types.ObjectId,
    content: String,
    create_time: Date,
    post_id: Types.ObjectId,
}



export const CommentSchema = new Schema<CommentT>({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    create_time: { type: Date },
    post_id: { type: Schema.Types.ObjectId, ref: "Post", requried: true },
});


CommentSchema.virtual("url").get(function () {
    return `/comment/${this._id}`;
})

export const Comment = mongoose.model<CommentT>("Comment", CommentSchema);