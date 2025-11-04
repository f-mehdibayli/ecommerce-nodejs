import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User reference is required"]
    },
    cartProducts: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: [true, "Product reference is required"]
            },
            count: {
                type: Number,
                default: 1
            }
        }
    ],
    currency: {
        type: String,
        required: [true, "Currency is required"]
    },
    totalPrice: {
        type: Number,
        required: [true, "Total price is required"],
        trim: true,
        default: 0,
        min: [0, "Total price must be at least 0"]
    },

}, { timestamps: true })

export default mongoose.model('Cart', cartSchema)