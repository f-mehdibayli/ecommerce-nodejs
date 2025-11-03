import Product from "../models/product.model.js"


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

export const addNewProduct = async (req, res) => {
    try {
        const access = req.user.roles.includes('store');
        if (!access) {
            return res.status(403).json({ message: "Access Denied" });
        }

        const {
            title,
            description,
            category,
            price,
            currency,
            stock,
            image,
            storeId
        } = req.body;

        const newProduct = new Product({ title, description, category, price, currency, stock, image, storeId });
        await newProduct.save();
        res.status(201).json(newProduct);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const getProductByStore = async (req, res) => {
    try {
        const { storeId } = req.params;
        const products = await Product.find({ storeId });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const editProduct = async (req, res) => {
    try {
        const { id } = req.params
        const updateProduct = await Product.findByIdAndUpdate(id, {
            $set: {
                title, description, category, price, currency, stock
            }

        }, { new: true })

        if (!updateProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params.id
        const isProductDeleted = await Product.findByIdAndDelete(id)

         if (!isProductDeleted) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({messsage: "product deleted succesfully"})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}