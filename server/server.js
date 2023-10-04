import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { notFound, errorHandler } from './middlewares/errorHandler.js'
import dbConnect from './config/dbConfig.js';

import cloudinary from 'cloudinary'
import fileUpload from 'express-fileupload'

import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoute.js'
import paymentRouter from './routes/paymentRoute.js'


const app = express();

// config
dotenv.config();
dbConnect();


// midddleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.ORIGIN, credentials: true, }));

app.use(fileUpload({
    useTempFiles: true,
}));

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true
});

// routes
app.use('/', userRouter);
app.use('/', productRouter);
app.use('/', orderRouter);
app.use('/', paymentRouter);





// error handler middlware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3500;


app.listen(PORT, () => console.log(`server listening on ${PORT} 🚀`));

