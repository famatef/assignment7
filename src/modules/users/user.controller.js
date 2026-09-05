import{Router} from "express";
import * as US from "./user.service.js";
const userRouter = Router();
userRouter.post("/",US.createUser);
userRouter.put("/:id",US.updateUser);
userRouter.put("/",US.updateUser);
userRouter.get("/email/:email",US.getUserByEmail);
userRouter.get("/:id",US.getUserById);





export default userRouter;