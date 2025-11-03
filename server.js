import express from 'express';
import mongoose from 'mongoose';
import { config } from './src/config/index.js';
import AuthRoutes from './src/routes/auth.route.js';
import ProductRoutes from './src/routes/product.route.js';
import CartRoute from './src/routes/cart.route.js';

const connectDB = async() => {
    try {
        await mongoose.connect(config.mongo_url)
        console.log("Mongo DB connected");
    } catch (error) {
        console.log("Mongo DB connected failed:", error);
        process.exit(1)
    }
}

const app = express();
const port = config.port;

app.use(express.json());

app.use('/auth', AuthRoutes );
app.use('/products', ProductRoutes );
app.use('/cart', CartRoute );

app.listen(port, ()=> {
    connectDB();
    console.log(`Server is running on port ${port}`);
})



