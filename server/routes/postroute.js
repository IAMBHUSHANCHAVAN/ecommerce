import  express from "express";
import {getFeedPosts , getUserPost , likedPost} from "../controller/posts.js"
import { verifyToken } from "../middleware/auth.js";
const router = express.Router()

// read

router.get("/",verifyToken , getFeedPosts)
router.get("/:userId/posts", verifyToken , getUserPost)


// update 

router.patch("/:id/like", verifyToken , likedPost)
export default router