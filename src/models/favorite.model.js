import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
     products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    count: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export const Favorite = mongoose.model('Favorite', cartSchema)