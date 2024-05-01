/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import config from './config';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';
import uploadRouter from './routers/uploadRouter';
if (!productRouter) {
    console.log('not product router');
} else {
    console.log('product router found');
}
mongoose
    .connect(config.MONGODB_URL)
    .then(() => {
        console.log('connected to mongodb database here');
    })
    .catch((error) => {
        console.log(error.reason);
    });
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);

app.use('/api/paypal/clientId', (req, res) => {
    res.send({ clientId: config.PAYPAL_CLIENT_ID });
});

app.use((err, req, res, next) => {
    const status = err.name && err.name === 'ValidationError' ? 400 : 500;
    res.status(status).send({ message: err.message });
});
app.listen(5000, () => {
    console.log('serve at http://localhost:5000');
});
