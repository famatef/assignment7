import { db } from "../connectionDB.js";

const Author = db.collection("authors");

export const authorFields = {
    name: "name",
    email: "email",
    books: "books"
};

export default Author;