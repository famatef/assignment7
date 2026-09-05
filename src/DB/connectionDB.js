import { Sequelize } from "sequelize";
 export const sequelize = new Sequelize("assignment5", "root", "root", {
    host: "localhost",
    dialect: "mysql",
});
export const connectionDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
export const syncDB = async () => {
    try {
        await sequelize.sync({ alter: false, force: false });
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Unable to synchronize the database:", error);
    }
};
