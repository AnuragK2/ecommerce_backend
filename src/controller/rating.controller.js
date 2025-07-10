const ratingService = require("../services/rating.service");

const createRating = async (req, res) => {
    const user = await req.user; // Assuming user is set in the request by authentication middleware
    try {
        const rating = await ratingService.createRating(req.body,user);
        return res.status(201).send(rating);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const getAllRatings = async (req, res) => {
    const productId = req.params.productId; // Assuming productId is passed as a URL parameter
    try {
        const rating = await ratingService.getAllRatings(productId);
        return res.status(200).send(rating);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    createRating,
    getAllRatings
};