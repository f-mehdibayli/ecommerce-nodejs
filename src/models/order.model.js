import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, "Order address is required"],
        trim: true
    },
    postcode: {
        type: String,
        required: [true, "Postcode is required"],
        trim: true
    },
    orderedProducts:{
        type: mongoose.Schema.ObjectId,
        ref: "Cart",
        required: [true, "Ordered products reference is required"]
    },
    paymentId: {
        type: String,
        required: [true, "Payment ID is required"]
    }
}, { timestamps: true })

export const Order = mongoose.model('Order', orderSchema)