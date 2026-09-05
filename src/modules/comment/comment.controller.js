import {Router} from "express";
import * as CS from "./comment.service.js";
const commentRouter = Router();


commentRouter.post("/create",CS.createComment);
commentRouter.put("/update/:commentId",CS.updateComment);
commentRouter.put("/:commentId",CS.updateComment);
commentRouter.get("/:postId",CS.getNewestComments);
commentRouter.get("/:id",CS.getCommentDetails);
commentRouter.get("/search",CS.searchComments);
commentRouter.post("/findOrCreate",CS.findOrCreateComment);



export default commentRouter;