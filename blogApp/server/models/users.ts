import mongoose from "mongoose"
const Schema = mongoose.Schema;

export interface UserT extends mongoose.Document {
    username: String,
    password: String,
}



export const UserSchema = new Schema<UserT>({
    username: { type: String, required: [true, "Please provide a username!"] },
    password: { type: String, required: [true, "Please provide a password!"] }
});


UserSchema.virtual("url").get(function () {
    return `/user/${this.username}`;
})

export const User = mongoose.model<UserT>("User", UserSchema);
