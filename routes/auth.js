import express from 'express';
import { changepassword, forgotpassword, login, matchotp } from '../controllers/auth.js';

const router=express.Router();
router.post("/login",login);
router.post("/forgotpswd",forgotpassword);
router.post("/matchotp",matchotp);
router.post("/changepassword",changepassword);

export default router;