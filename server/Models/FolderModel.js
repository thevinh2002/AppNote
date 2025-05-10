import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        authorId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Tạo model
const FolderModel = mongoose.models.Folder || mongoose.model("Folder", FolderSchema);

// Export đúng
export default FolderModel;

// Hoặc nếu bạn muốn named export:
export { FolderModel };
