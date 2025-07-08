const reviewService = require("../services/review.service");

const createReview = async (req, res) => {
    const user = req.user; // Assuming user is set in the request by authentication middleware
    try {
        const review = await reviewService.createReview(req.body,user);
        return res.status(201).send(review);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const getAllReview = async (req, res) => {
    const productId = req.params.productId; // Assuming productId is passed as a URL parameter
    try {
        const reviews = await reviewService.getAllReview(productId);
        return res.status(200).send(reviews);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    createReview,
    getAllReview
};