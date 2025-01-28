import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import {
    commentPost,
    createPost,
    deleteComment,
    deletePost,
    getComments,
    getFollowers,
    getPopularContents,
    getPost,
    getPostContent,
    getPosts,
    stats,
    updatePost,
  } from "../controllers/postController.js";

const router = express.Router();

// Admin Routes
router.post("/admin-analytics", userAuth, stats);
router.post("/admin-followers", userAuth, getFollowers);
router.post("/admin-content", userAuth, getPostContent);
router.post("/create-post", userAuth, createPost);

// Like And Comment Routes
router.post("/comment/:id", userAuth, commentPost);

// Update POST
router.patch("/update/:id", userAuth, updatePost);

// Get Post
router.get("/", getPosts);
router.get("/popular", getPopularContents);
router.get("/:postId", getPost);
router.get("/comment/:postId", getComments);

// Delete Post
router.delete("/:id", userAuth, deletePost);
router.delete("/comment/:id/:postId", userAuth, deleteComment);

export default router;