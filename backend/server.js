const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

const authRoutes = require("./routes/auth.route.js");
const productRoutes = require("./routes/product.route.js");
const cartRoutes = require("./routes/cart.route.js");
const couponRoutes = require("./routes/coupon.route.js");
const paymentRoutes = require("./routes/payment.route.js");
const analyticsRoutes = require("./routes/analytics.route.js");

const { connectDB } = require("./lib/db.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
      "http://localhost:5173",
      "https://genuine-hummingbird-f7a10a.netlify.app",
      "https://*.netlify.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.status(200).json({ 
      status: "OK", 
      message: "Server is healthy",
      timestamp: new Date().toISOString()
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
    res.json({ 
      message: "MangaStore API is running",
      version: "1.0.0",
      timestamp: new Date().toISOString()
    });
});



const startServer = async () => {
    try {
        await connectDB();
        console.log("Connected to MongoDB successfully");
        
        app.listen(PORT, () => {
            console.log("Server is running on http://localhost:" + PORT);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
};
  
startServer();
