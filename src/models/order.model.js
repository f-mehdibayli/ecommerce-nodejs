import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, "Order address is required"],
        trim: true,
        maxLength: [100, "Store must be at most 100 characters long"]
    },
    postcode: {
        type: String,
        required: [true, "Postcode is required"],
        trim: true,
        maxLength: [50, "Postcode must be at most 100 characters long"]
    },
    totalPrice: {
        type: Number,
        required: [true, "Order address is required"],
        trim: true,
        maxLength: [100, "Store must be at most 100 characters long"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // orderItems: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "orderItems"
    // }]
}, { timestamps: true })

export const Order = mongoose.model('Order', orderSchema)