import { db } from "../connectionDB.js";

const Log = db.collection("logs");

export const logFields = {
    bookTitle: "bookTitle",
    action: "action",
    createdAt: "createdAt"
};

export default Log;