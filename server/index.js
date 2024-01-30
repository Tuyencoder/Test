const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { Database } = require("./config");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const path = require('path');
const { fileURLToPath } = require('url');

// Adjusting for the lack of import.meta.url in CommonJS, using __dirname and __filename directly
const app = express();

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to serve images from 'public/image' directory
app.get("/image/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(path.join(__dirname, `public/image/${imageName}`));
});

// Connect to the database
mongoose
  .connect(Database)
  .then(() => console.log("connect db successfully"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// CORS configuration
const whitelist = ["http://localhost:3000", "https://sandbox.vnpayment.vn"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);

// Start the server
app.listen(8000, () => console.log("listening on port: 8000"));
