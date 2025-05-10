// Models/AuthorModel.js
import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Tránh OverwriteModelError khi dùng lại model
const AuthorModel = mongoose.models.Author || mongoose.model("Author", AuthorSchema);

export default AuthorModel;
