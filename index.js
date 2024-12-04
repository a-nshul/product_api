const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const helmet = require('helmet');
const path = require('path');
const connectDB = require("./config/db");
const productRoutes = require('./routes/productRoutes');

dotenv.config();
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: "*", // Allow all origins
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  exposedHeaders: ["X-Auth-Token"], // Expose custom headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  preflightContinue: false,
  optionsSuccessStatus: 204, // For older browsers
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', productRoutes);

// Start server
const PORT = process.env.PORT || 3001;

const server =app.listen(PORT,()=>{
  console.log(`Server running on PORT 3001...`)
})
