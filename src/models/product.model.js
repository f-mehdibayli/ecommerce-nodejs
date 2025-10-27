import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        maxLength: [100, "Product name must be at most 100 characters long"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        trim: true,
        maxLength: [50, "Product price must be at most 50 characters long"]
    },
    image: {
        type: String,
        required: [true, "Product image is required"],
        trim: true,
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
}, { timestamps: true })

export const Product = mongoose.model('Product', productSchema)