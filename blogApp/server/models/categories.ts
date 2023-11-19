import mongoose from "mongoose"
const Schema = mongoose.Schema;

export interface CategoryT extends mongoose.Document {
    name: String,
}



export const CategorySchema = new Schema<CategoryT>({
    name: { type: String, required: true },
});


CategorySchema.virtual("url").get(function () {
    return `/post/${this._id}`;
})

export const Category = mongoose.model<CategoryT>("Category", CategorySchema);
