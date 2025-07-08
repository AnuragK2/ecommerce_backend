const productService = require("../services/product.service");

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product) {
            return res.status(404).send({ error: "Product not found" });
        }
        return res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        if (!product) {
            return res.status(404).send({ error: "Product not found" });
        }
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const findProductById = async (req, res) => {
    try {
        const product = await productService.findProductById(req.params.id);
        if (!product) {
            return res.status(404).send({ error: "Product not found" });
        }
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts(req.query);
        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const createMultipleProducts= async (req, res) => {
    try {
        const products = await productService.createMultipleProducts(req.body);
        return res.status(201).send({message: "Products created successfully" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProducts,
    createMultipleProducts
};