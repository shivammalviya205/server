import express from 'express';
import { verifyToken } from '../middleware/auth.js';

import{
 getUser,
 getUserFollowers,
 getUserFollowing,
 addRemoveFollower,
 
} from "../controllers/user.js";
const router=express.Router();

/*REAd */
router.get('/:id',verifyToken,getUser);
router.get("/:id/followers",verifyToken,getUserFollowers);
router.get("/:id/following",verifyToken,getUserFollowing);


/*Update*/
router.patch("/:id/:friendId/togglefollow", verifyToken, addRemoveFollower);

export default router;
