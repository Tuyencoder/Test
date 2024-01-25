import Product from "../models/product.js";
import Image from "../models/image.js";

export const getLists = async (req, res) => {
  try {
    // Course.find({})
    const course = await Product.find({}).populate("image");
    return res.json(course);
  } catch (error) {
    console.log(error);
  }
};

export const adđProduct = async (req, res) => {
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

    res.send("product created and with image.");
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Server error");
  }
};
export const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  console.log("idProduct: ", productId);
  console.log("body", req.body);
  const { userID, name, description, price } = req.body;
  console.log(req.body.name);

  try {
    const updateProduct = await Product.findByIdAndUpdate(productId, {
      name,
      description,
      price: parseInt(price),
    });

    console.log("productId", updateProduct);
    return (
      res
        // .json("updateCourse",updateCourse)
        .status(200)
        .json({ message: "Update successfully" })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Kiểm tra xem sản phẩm có tồn tại không
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Xóa sản phẩm dựa trên _id của sản phẩm
    await Product.findByIdAndDelete(productId);

    return res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ _id: productId }).populate("image");
    // console.log(course.image.filename);
    // console.log(course)
    product.toObject();
    // console.log(course)
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};
