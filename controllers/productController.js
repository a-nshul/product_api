const Product = require('../models/productModels');

// Add a new product
const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    if (req.file) productData.image = req.file.path.replace(/\\/g, '/');
    const product = await Product.create(productData);
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};

// Get all products with pagination
const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();
    res.status(200).json({
      products,
      total,
      page: Number(page),
      limit: Number(limit),
      message: 'Product fetched  successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const productData = req.body;
    if (req.file) productData.image = req.file.path.replace(/\\/g, '/');
    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ product,message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
