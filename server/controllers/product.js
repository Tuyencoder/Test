const Product = require("../models/product"); // Assuming product.js exports a Product model as default
const Image = require("../models/image"); // Assuming image.js exports an Image model as default

const getLists = async (req, res) => {
  try {
    const products = await Product.find({}).populate("image");
    return res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image file uploaded.");
    }

    const { name, description, price } = req.body;
    const { filename, originalname, path, size, mimetype } = req.file;
    const image = new Image({
      filename,
      originalname,
      path,
      size,
      mimetype,
    });
    await image.save();

    const product = new Product({
      name,
      description,
      price,
      image: image._id,
    });
    await product.save();

    res.send("Product created with image.");
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Server error");
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      name,
      description,
      price: parseInt(price),
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Update successfully", product: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate("image");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getLists, addProduct, updateProduct, deleteProduct, getProduct };
