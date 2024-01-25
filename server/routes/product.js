import express from "express";
import multer from "multer";
import path from "path";
import * as product from "../controllers/product.js";
import { requireSignin } from "../middlewares/auth.js";
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

router.post("/addProduct", upload.single("image"), product.adđProduct);

router.get("/list", product.getLists);
router.put("/update/:productId", requireSignin,multer().none(), product.updateProduct);

router.delete("/delete/:productId", requireSignin, product.deleteProduct);

router.get("/getProduct/:productId", product.getProduct);
export default router;
