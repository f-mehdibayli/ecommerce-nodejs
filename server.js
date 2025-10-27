import express from 'express';
import mongoose from 'mongoose';
import { config } from './src/config';

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

app.listen(port, ()=> {
    connectDB();
    console.log(`Server is running on port ${port}`);
})



