import { sequelize,connectionDB,syncDB } from "../connectionDB.js";
import { DataTypes } from "sequelize";


const User = sequelize.define(
    "user",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: { msg: "Invalid Email" },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                checkPasswordLength(value) {
                    if (value.length < 8) {
                        throw new Error("Password must be at least 8 characters long");
                    }
                },
            },
        },
        role: { type: DataTypes.ENUM("admin", "user"), defaultValue: "user" },
        
    },
    {
        timestamps: true,
        hooks: {
            beforeCreate: (user) => {
                checkNameLength(user.name);
            },
        },
    }
);

const checkNameLength = (name) => {
    if (name.length <= 2) {
        throw new Error("Name must be at least 3 characters long");
    }
};

export default User;