import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        maxLength: [200, "Product name must be at most 200 characters long"]
    },
     description: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category"
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        trim: true,
        min: [0, "Product price must be at least 0"]
    },
    currency:{
        type: String,
        default: "$",
        enum: ["$", "₼", "₽", "€", "₼", "£", "¥"]
    },
    stock: {
        type: Number,
        min: [0, "Product stock must be at least 0"],
        required: [true, "Product stock is required"],
    },
    image: {
        type: [String],
        default: [],
        trim: true,
    },
    storeId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

productSchema.index({title: 'text', description: 'text'});

export default mongoose.model('Product', productSchema)
