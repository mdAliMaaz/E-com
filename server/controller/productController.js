import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';
import { ApiFeatures } from '../utils/apifeatures.js';

// @ Desc get all products
// @ Route GET: /api/products
export const getAllProducts = asyncHandler(async (req, res) => {

    // Searching for products
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();


    const allProducts = await apiFeature.query

    if (!allProducts) {
        res.status(404).json({ message: 'Products not found' })
    }
    res.status(200).json({ allProducts })
})

// @ Desc get all products
// @ Route GET: /api/products/:id
export const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const singleProduct = await Product.findById(id);
    if (!singleProduct) {
        res.status(404)
        throw new Error('Product not found');
    }
    res.status(200).json({ singleProduct })
})

// @ Desc get all products
// @ Route POST:/api/products
// @ ADMIN
export const addNewProduct = asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body);

    if (newProduct) {
        res.status(201).json({ success: true, message: "New Product Created", newProduct })
    }
    else {
        res.status(400)
        throw new Error('Invalid Input')
    }
})


// @ Desc get all products
// @ Route PUT: /api/products/:id
// @ Admin
export const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
        res.status(404)
        throw new Error('Product not found')
    }
    res.status(200).json({ message: "Product updated successfully", updatedProduct })
})


// @ Desc get all products
// @ DELETE:Route /api/products/:id
// @ Admin
export const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        req.status(404)
        throw new Error('Product not found')
    }

    res.status(200).json({ message: "Product deleted successfully", deletedProduct })
})