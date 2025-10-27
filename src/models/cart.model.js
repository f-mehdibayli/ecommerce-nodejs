import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: [true, "Order address is required"],
        trim: true,
        maxLength: [100, "Store must be at most 100 characters long"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

export const Cart = mongoose.model('Cart', cartSchema)