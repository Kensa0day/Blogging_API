import express from "express";
import { googleSignup, register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register)
router.post("/google-signup", googleSignup)
router.post("/login", login)

export default router;