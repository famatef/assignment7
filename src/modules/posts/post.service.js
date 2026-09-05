import { col, fn } from "sequelize";
import Post from "../../DB/models/post.model.js";
import User from "../../DB/models/user.model.js";
import Comment from "../../DB/models/comment.model.js";

export const createPost = async (req, res, next) => {
    try {
        const { title,content, userId } = req.body; 
        const post = new Post({ title, content, userId });
        await post.save();
        res.status(201).json({ message: "Post created successfully", post });
    } catch (err) {
        res.status(500).json({ message: "Error creating post", error: err.message });
    }
    
};
export const deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = Number(req.body?.userId ?? req.query.userId ?? req.params.userId);
        if(!Number.isInteger(userId) || userId <= 0){
            res.status(400).json({ message: "userId is required" });
            return;
        }
        const post = await Post.findByPk(postId);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        if (post.userId !== userId) {
            res.status(403).json({ message: "You are not authorized to delete this post" });
            return;
        }
        await post.destroy();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting post", error: err.message });
    }
};
export const getPostsDetails = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            attributes: ["id", "title"],
            include: [
                {
                    model: User,
                    attributes: ["id", "name"],
                    
                },
                {
                    model: Comment,
                    attributes: ["id", "content"],
                    
                },
            ],
        
        });
        res.status(200).json({ message: "Posts retrieved successfully", posts });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving posts", error: err.message });
    }
};
export const getPostsCommentCount = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            attributes: ["id", "title", [fn("COUNT", col("comments.id")), "commentCount"]],
            include: [
                {
                    model: Comment,
                    attributes: []
                },
            ],
            group: ["post.id"],
        });
        res.status(200).json({ message: "Posts retrieved successfully", posts });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving posts", error: err.message });
    }
};

            
        