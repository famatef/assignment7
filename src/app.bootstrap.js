import express from "express";
import { connectionDB } from "./DB/connectionDB.js";
import { syncDB } from "./DB/connectionDB.js";
import userRouter from "./modules/users/user.controller.js";
import postRouter from "./modules/posts/post.controller.js";
import commentRouter from "./modules/comment/comment.controller.js";
const app = express();
const port = 3000;
const bootstrap = async () => {
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.use(express.json());
    await connectionDB();
    await syncDB();
    app.use("/users", userRouter);
    app.use("/posts", postRouter);
    app.use("/comment", commentRouter);

    app.use((req, res) => {
        res.status(404).send("Not Found");
    });
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

export default bootstrap;