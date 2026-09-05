import { DataTypes} from "sequelize";
import {sequelize,connectionDB,syncDB} from "../connectionDB.js";
import Post from "./post.model.js";
import User from "./user.model.js";

const Comment = sequelize.define("comment",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    content:{type:DataTypes.STRING,allowNull:false},
    postId:{type:DataTypes.INTEGER,allowNull:false},
    userId:{type:DataTypes.INTEGER,allowNull:false}
}, {
    timestamps: true,
    paranoid: true
})
Comment.belongsTo(Post,{
    foreignKey:"postId",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
Comment.belongsTo(User,{
    foreignKey:"userId",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
Post.hasMany(Comment,{
    foreignKey:"postId",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
User.hasMany(Comment,{
    foreignKey:"userId",
})

export default Comment;