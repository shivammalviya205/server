import express from "express";
import { deletecomment, getFeedPosts, getUserPosts, likePost, postcomment } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.post("/:id/postcomment",verifyToken,postcomment)
router.post("/:id/deletecomment",verifyToken,deletecomment)
export default router;