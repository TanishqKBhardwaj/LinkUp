import express from "express"
import authChecker from "../middleware/auth.middleware.js"
import {getRecommendatedUsers,getMyFriends,sendFriendReq,acceptFriendReq,getAllFriendReqs,outGoingFriendReqs} from "../controllers/user.controller.js"


const router =express.Router();

router.get("/",authChecker,getRecommendatedUsers);
router.get('/friends',authChecker,getMyFriends);
router.post('/friend-req/:id',authChecker,sendFriendReq);
router.put('/friend-req/:id/accept',authChecker,acceptFriendReq);
router.get('/friend-req',authChecker,getAllFriendReqs);
router.get('/friend-req/outgoing',authChecker,outGoingFriendReqs);


export default router;