import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
    {
        content: {
            type: String,

        },
        folderId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const NoteModel = mongoose.models.Note || mongoose.model("Note", NoteSchema);

export default NoteModel;
