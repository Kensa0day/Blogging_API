import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import { OTPVerification, followWritter, getWriter, resendOTP, updateUser } from "../controllers/userContoller.js";


const router = express.Router();

router.post("/verify/:userId/:otp", OTPVerification);
router.post("/resend-link/:id", resendOTP);

// user routes
router.post("/follower/:id", userAuth, followWritter);
router.put("/update-user", userAuth, updateUser);

router.get("/get-user/:id?", getWriter);

export default router;