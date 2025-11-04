import User from '../models/user.model.js';
import productModel from '../models/product.model.js';

export const getFavorites = async (req, res)=> {
    try {
        const user = await User.findById(req.user.id).populate('favoriteProducts');
        res.status(200).json({
            success : true,
            favorites: user.favoriteProducts
        });
    } catch (error) {
        console.log("Error in getFavorites:", error.message);
        res.status(500).json({ success:false, message: error.message });
    }
}

export const toggleFavorite = async (req ,res)=>{
    try {
        const { productId } = req.params;

        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({ success:false, message: "User not found" });
        } 

        const product = await productModel.findById(productId)
        if(!product){
            return res.status(404).json({ success:false, message: "Product not found" });
        } 

        const alreadyFavorited = user.favoriteProducts.includes(productId);

        if(alreadyFavorited){
           user.favoriteProducts = user.favoriteProducts.filter(id => id != productId);
           await user.save();
           return res.status(200).json({ success:true, message: "Product removed from favorites" });
        }else{
            user.favoriteProducts.push(productId);
            await user.save();
             return res.status(200).json({ success:true, message: "Product added to favorites" });
        }

    } catch (error) {
        console.log("Error in toggleFavorite:", error.message);
        res.status(500).json({ success:false, message: error.message });
    }
}