const express = require("express");
const multer = require("multer");
const path = require("path");
const product = require("../controllers/product");
const { requireSignin } = require("../middlewares/auth");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

router.post("/addProduct", upload.single("image"), product.addProduct); // Fixed typo in "addProduct"

router.get("/list", product.getLists);
router.put("/update/:productId", requireSignin, multer().none(), product.updateProduct);

router.delete("/delete/:productId", requireSignin, product.deleteProduct);

router.get("/getProduct/:productId", product.getProduct);

module.exports = router;
