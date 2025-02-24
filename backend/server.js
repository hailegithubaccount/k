const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const cookieParser = require("cookie-parser"); 
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser()); 
connectDB()


const userRoutes = require('./routes/userRoute');
const adminRoutes =require('./routes/adminRoute');
const bookRoutes=require('./routes/bookRoute');

// // Use the routes
app.use('/api/user', userRoutes);
app.use('/api/user',adminRoutes);
app.use("/api/user/books", bookRoutes); // Registration route

// Start the server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
