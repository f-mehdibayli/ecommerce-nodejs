import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        maxLength: [100, "Category must be at most 100 characters long"]
    }
}, { timestamps: true })

export const Category = mongoose.model('Category', categorySchema)