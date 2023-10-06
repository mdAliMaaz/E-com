import asyncHandler from 'express-async-handler';
import cloudinary from 'cloudinary';
import Product from '../models/productModel.js';
import { ApiFeatures } from '../utils/apifeatures.js';

// @ Desc get all products
// @ Route GET: /api/products
export const getAllProducts = asyncHandler(async (req, res) => {

    // Searching for products
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(6);

    const productCount = await Product.countDocuments();

    const allProducts = await apiFeature.query

    if (!allProducts) {
        res.status(404).json({ message: 'Products not found' })
    }
    res.status(200).json({ products: allProducts, productCount })
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

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }
    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }
    req.body.images = imagesLinks;


    const newProduct = await Product.create({ ...req.body, user: req.user.id });

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

    const product = await Product.findById(id);

    if (req.body.images) {
        product.images.forEach(async (item) => {
            await cloudinary.v2.uploader.destroy(item.public_id)
        })
    }
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
        res.status(404)
        throw new Error('Product not found')
    }
    res.status(200).json({ success: true, message: "Product updated successfully" })
})


// @ Desc get all products
// @ DELETE:Route /api/products/:id
// @ Admin
export const deleteProduct = asyncHandler(async (req, res) => {

    const id = req.params.id;
    // Deleteing images in cloud storage
    const product = await Product.findById(id);

    product.images.forEach(async (item) => {
        await cloudinary.v2.uploader.destroy(item.public_id)
    })

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        req.status(404)
        throw new Error('Product not found')
    }

    res.status(200).json({ success: true, message: "Product deleted successfully", })
})


// @ Desc add a review
// @ PUT:Route /api/review
export const addRewiewAndUpdate = asyncHandler(async (req, res) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user.id.toString());


    if (isReviewed) {

        isReviewed.rating = rating;
        isReviewed.comment = comment;
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.ratings = product.reviews.forEach((rev) => {
        avg += rev.rating
    }) / product.reviews.length;

    product.ratings = avg / product.reviews.length;


    await product.save();

    res.status(200).json({ success: true })
})

//  @ Desc get All reviews
// @ GET:Route /api/reviews
export const getReviewsByProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        response.status(404)
        throw new Error(`Product not found`)
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//  @ Desc get All reviews
// @ PUT:Route /api/reviews
export const deleteReview = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        response.status(404)
        throw new Error(`Product not found`)
    }
    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.rId.toString())

    let avg = 0;

    product.ratings = product.reviews.forEach((rev) => {
        avg += rev.rating
    }) / product.reviews.length;


    const rating = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, rating,
        numOfReviews
    }, { new: true })

    res.status(200).json({ success: true })

})