const Product = require("../model/Product");
const cloudinary = require("../config/cloudinary");
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stockQuantity } = req.body;
        const imageFile = req.file;

        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stockQuantity = stockQuantity || product.stockQuantity;
            if(req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                product.imageUrl = result.secure_url;
            }
            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);

        }
        else {
            res.status(404).json({ message: "Product not found" });
        }

        // If a new image is provided, upload it to Cloudinary
        if (imageFile) {
            const result = await cloudinary.uploader.upload(imageFile.path);
            product.imageUrl = result.secure_url;
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stockQuantity = stockQuantity || product.stockQuantity;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error ) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stockQuantity } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ message: "Image file is required" });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(imageFile.path);
        const imageUrl = result.secure_url;

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
        res.status(500).json({ message: error.message });
    }
};  
module.exports = {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createProduct
};