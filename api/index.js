const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const morgan = require("morgan"); // HTTP request logger
const cookieParser = require("cookie-parser");
const errorHandler = require("../middlewares/errorHandler");
const CustomError = require("../utils/CustomError");
const dotenv = require("dotenv");
const path = require("path");
const { inject } = require("@vercel/analytics");
 
inject();

dotenv.config();

const adminAuthRouter = require("./routes/adminAuthRoutes");
const dashboardRouter = require("./routes/adminDashboardRoutes");
const generateRoutes = require("./routes/routerGenerator");

//MODELS
const News = require("../models/News");
const Staff = require("../models/Staff");
const Branch = require("../models/Branch");
const Album = require("../models/Album");
const Story = require("../models/Story");
const Service = require("../models/Services");

const app = express();

// Middleware for logging HTTP requests
app.use(morgan("dev"));

// Security middleware
// Set security HTTP headers allow CSP requests to 'self' to enable admin dashboard js functions 
const helmet = require("helmet");
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            connectSrc: ["'self'", "https://api.cloudinary.com"],  // Allows connections to Cloudinary's API
            imgSrc: ["'self'", "https://res.cloudinary.com"],       // Allows images loaded from Cloudinary
            mediaSrc: ["'self'", "https://res.cloudinary.com"]      // Allows media content from Cloudinary
        },
    })
);
app.use(mongoSanitize());
app.use(xss());

app.use(compression({
    threshold: 2048 // Compress responses only if they are at least 2KB
}));

// Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
});

// CORS setup
const corsOptions = {
    origin: "*",
    methods: ['GET'],
    credentials: true
};



app.use("/api", apiLimiter); // Apply rate limiting
app.use(cors(corsOptions)); // Apply CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); 

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());



// Admin routes
app.use("/admin", adminAuthRouter);
app.use("/admin/dashboard", dashboardRouter);

// Route for news-related endpoints
app.use("/api/news", generateRoutes(News));
app.use("/api/staff", generateRoutes(Staff));
app.use("/api/branch", generateRoutes(Branch));
app.use("/api/album", generateRoutes(Album));
app.use("/api/story", generateRoutes(Story));
app.use("/api/service", generateRoutes(Service));


// Catch-all 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).render('admin/pages/404');
});


// Error handler middleware
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Async MongoDB connection
let isConnected = false;

const connectDatabase = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.DEV_MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
};

connectDatabase();

module.exports = app;
