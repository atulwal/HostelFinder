import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.contoller.js";


const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)

export default router


/* 
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router; 
*/