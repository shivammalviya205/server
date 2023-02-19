import express from "express";
import { deletecomment, getFeedPosts, getFollowingPosts, getUserPosts, hiremail, likePost, postcomment } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:userId/followingpost", verifyToken, getFollowingPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.post("/:id/postcomment",verifyToken,postcomment)
router.post("/:id/deletecomment",verifyToken,deletecomment)

/*hire*/ 
router.post("/hire/:postuserid/:id",verifyToken,hiremail)
export default router;