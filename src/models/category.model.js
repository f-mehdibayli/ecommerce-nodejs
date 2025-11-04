import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Category name is required"],
        unique: [true, "Category already exists"],
        trim: true
    }
}, { timestamps: true })

export default mongoose.model('Category', categorySchema)