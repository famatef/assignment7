import {Op} from "sequelize";
import Comment from "../../DB/models/comment.model.js";
import Post from "../../DB/models/post.model.js";
import User from "../../DB/models/user.model.js";

export const createComment = async (req, res, next) => {
    try {
        const comments = await Comment.bulkCreate(req.body);
        res.status(201).json({ message: "Comment created successfully", comments });
    } catch (err) {
        res.status(500).json({ message: "Error creating comment", error: err.message });
    }
};
export const updateComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { userId, content } = req.body ?? {};
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            res.status(404).json({ message: "Comment not found" });
            return;
        }
        if (comment.userId !== Number(userId)) {
            res.status(403).json({ message: "You are not authorized to update this comment" });
            return;
        }
        await comment.update({ content });
        res.status(200).json({ message: "Comment updated successfully", comment });
    } catch (err) {
        res.status(500).json({ message: "Error updating comment", error: err.message });
    }
};
export const findOrCreateComment = async (req, res, next) => {
    try {
        const { postId, userId, content } = req.body ?? req.query;
        if(!postId || !userId || !content){
            res.status(400).json({ message: "postId, userId and content are required" });
            return;
        }
        const [comment, created] = await Comment.findOrCreate({
            where: { postId, userId, content },
            defaults: { postId, userId, content },
        });
        res.status(200).json({ message: "Comment found or created successfully", comment, created });
    } catch (err) {
        res.status(500).json({ message: "Error finding or creating comment", error: err.message });
    }
};
export const searchComments = async (req, res, next) => {
    try {
        const {word} = req.query;
        const comments = await Comment.findAll({
            where: {
                content: {
                    [Op.iLike]: `%${word}%`,
                },
            },
        });
        res.status(200).json({ message: "Comments retrieved successfully", comments });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving comments", error: err.message });
    }
};
export const getNewestComments = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.findAll({
            where: { postId },
            order: [["createdAt", "DESC"]],
            limit: 5,
        });
        res.status(200).json({ message: "Newest comments retrieved successfully", comments });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving comments", error: err.message });
    }
};
export const getCommentDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByPk(id, { include: [{ model: User }, { model: Post }] });
        if(!comment){
            res.status(404).json({message:"Comment not found"});
            return;
        }
        res.status(200).json({message:"Comment found",comment});
    }
    catch(err){
        res.status(500).json({message:"Error finding comment",error:err.message});
    }
}
        