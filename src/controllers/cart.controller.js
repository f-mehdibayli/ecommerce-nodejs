import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

export const getAllProducts = async (req, res) => {
    try {
        const cartProducts = await Cart.find({user: req.user.id }).sort(-1);
        res.status(200).json(cartProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
}

export const addNewCartProduct = async (req, res) => {
    try {
        const { productId, count} = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cartItem =  {
            product: product,
            count: count,
        }
        const userCart = await Cart.find({ user: req.user.id });

        if(!userCart) {
            const newCart = new Cart({
                user: req.user.id,
                cartProducts: [cartItem]
            });
            await newCart.save();
            return res.status(201).json(newCart);
        }

        const updatedItems = userCart.cartProducts.map(item => {
             item.product.id === productId ? {
              ...item.product
                , count: item.count + count
             } : cartItem
        });

        userCart.cartProducts = updatedItems;
        await userCart.save();

        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        
    }
}

export const removeProductFromCart = async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    try {
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const userCart = await Cart.findOne({ user: req.user.id });
        if (!userCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        userCart.cartProducts = userCart.cartProducts.filter(item => item.product.id !== productId);
        await userCart.save();

        res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        
    }
}
