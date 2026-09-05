import {Router} from "express";
import * as PS from "./post.service.js";
const postRouter = Router();

postRouter.post("/",PS.createPost);
postRouter.delete("/:postId",PS.deletePost);
postRouter.delete("/:postId/:userId",PS.deletePost);
postRouter.get("/",PS.getPostsDetails);
postRouter.get("/details",PS.getPostsDetails);
postRouter.get("/commentCount",PS.getPostsCommentCount);


export default postRouter;
