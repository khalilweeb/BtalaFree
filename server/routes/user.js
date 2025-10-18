import express from 'express';


const router = express.Router();

import { signupUser, loginUser } from "../controllers/userController.js";
//login
router.post('/login' , loginUser);



//sginup route
router.post('/signup' , signupUser);


export default  router;