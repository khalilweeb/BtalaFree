import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from './routes/user.js';
import jobRoutes from "./routes/jobRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contractRoutes from "./routes/contractRoutes.js";
import tokenPackRoutes from "./routes/tokenPackRoutes.js";
dotenv.config();
connectDB(); 


const app = express();
app.use(express.json());

app.use((req , res , next) =>  {
    console.log(req.path , req.method);
    next();
})

//routes

app.use('/api/user' , userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contracts',contractRoutes);
app.use('api/tokenpack',tokenPackRoutes);


// connect
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
