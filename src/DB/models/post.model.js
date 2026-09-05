import { DataTypes} from "sequelize";
import {sequelize,connectionDB,syncDB} from "../connectionDB.js";
import User from "./user.model.js";

const Post = sequelize.define("post",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title:{type:DataTypes.STRING,allowNull:false},
    content:{type:DataTypes.STRING,allowNull:false},
    userId:{type:DataTypes.INTEGER,allowNull:false}
}, {
    timestamps: true,
    paranoid: true
})



Post.belongsTo(User,{
    foreignKey:"userId",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
User.hasMany(Post,{
    foreignKey:"userId",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
export default Post;