import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
     user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User reference is required"]
    },
     cartProducts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "CartItem"
        }
    ],
    currency: {
        type: String,
        required: [true, "Currency is required"]
    },
    totalPrice: {
        type: Number,
        required: [true, "Total price is required"],
        trim: true
    },
   
}, { timestamps: true })

export default mongoose.model('Cart', cartSchema)