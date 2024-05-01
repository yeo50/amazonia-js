import express from 'express';

import expressAsyncHandler from 'express-async-handler';

import { isAdmin, isAuth } from '../utils';
import Product from '../models/productModel';
import data from '../data';

const productRouter = express.Router();

productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const searchKeyword = req.query.searchKeyword
            ? {
                  name: {
                      $regex: req.query.searchKeyword,
                      $options: 'i',
                  },
              }
            : {};
        const products = await Product.find({ ...searchKeyword });
        res.send(products);
    })
);
productRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).send({
                message: 'Product Not Found',
            });
        }
        res.send(product);
    })
);
productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
            name: 'Royal Mens Joggers Pants Long Multi-Pockets',
            description: 'Under Armour Product of the year',
            category: 'Pants',
            image: './images/product-6.jpg',
            price: 54,
            brand: 'Royal',
            rating: 4.5,
            numReviews: 34,
            countInStock: 6,
        });
        const createdProduct = await product.save();
        if (createdProduct) {
            res.status(201).send({
                message: 'Product Created',
                product: createdProduct,
            });
        } else {
            res.status(500).send({ message: 'Error in creating product' });
        }
    })
);
productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).send({ message: 'Product Not Found' });
        } else {
            product.name = req.body.name || product.name;
            product.description = req.body.description || product.description;
            product.category = req.body.category || product.category;
            product.brand = req.body.brand || product.brand;
            product.image = req.body.image || product.image;
            product.price = req.body.price || product.price;
            product.countInStock =
                req.body.countInStock || product.countInStock;
            product.rating = req.body.rating || product.rating;
            product.numReviews = req.body.numReviews || product.numReviews;
            const updatedProduct = product.save();
            if (updatedProduct) {
                res.send(updatedProduct);
            }
        }
    })
);
productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            const deletedProduct = await product.deleteOne();
            res.send({ message: 'Product Deleted', product: deletedProduct });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);
export default productRouter;
