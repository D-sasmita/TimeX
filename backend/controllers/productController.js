const Product = require("../model/Product");
const cloudinary = require("../config/cloudinary");

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create product
const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            stockQuantity
        } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "Image file is required"
            });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        const newProduct = new Product({
            name,
            description,
            price,
            imageUrl: result.secure_url,
            category,
            stockQuantity
        });

        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            stockQuantity
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stockQuantity = stockQuantity || product.stockQuantity;

        // Upload new image only if provided
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            product.imageUrl = result.secure_url;
        }

        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await product.deleteOne();

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};