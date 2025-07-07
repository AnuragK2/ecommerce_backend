const Review= require("../models/review.model");
const ProductService = require("./product.service");

async function createReview(reqData, user){
    const product=await ProductService.findProductById(reqData.productId);
    const review = new Review({
        user: user._id,
        product: product._id,
        review: reqData.review,
        createdAt: new Date(),
    });
    await product.save();
    return await review.save();
}

async function getAllReview(productId){
    const product=await ProductService.findProductById(reqData.productId);
    return await Review.find({ product: product._id }).populate("user");
}

module.exports = {
    createReview,
    getAllReview,
};