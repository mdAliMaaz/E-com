import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { notFound, errorHandler } from './middlewares/errorHandler.js'
import dbConnect from './config/dbConfig.js';

import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoute.js'

const app = express();

// config
dotenv.config();
dbConnect();


// midddleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));



// routes
app.use('/', userRouter);
app.use('/', productRouter);
app.use('/', orderRouter);





// error handler middlware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3500;


app.listen(PORT, () => console.log(`server listening on ${PORT} 🚀`));

