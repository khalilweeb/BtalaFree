import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from './routes/user.js';

dotenv.config();
connectDB(); 


const app = express();
app.use(express.json());

app.use((req , res , next) =>  {
    console.log(req.path , req.methode);
    next();
})

//routes
app.use('/api/user' , userRoutes);

// connect
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
