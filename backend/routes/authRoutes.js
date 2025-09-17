import express from "express"
import {signIn,signOut,googleOAuth} from "../controllers/auth.controller.js"

const router=express.Router();

router.post("/signIn",signIn)
router.post("/signOut",signOut)
router.post("/google",googleOAuth)








export default router;