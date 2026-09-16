import { db } from "../connectionDB.js";

const Book = db.collection("books");

export const bookFields = {
    title: "title",
    author: "author",
    year: "year",
    genres: "genres"
};

export const bookValidation = {
    $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
            title: {
                bsonType: "string",
                minLength: 1
            },
            author: {
                bsonType: "string"
            },
            year: {
                bsonType: "int"
            },
            genres: {
                bsonType: "array"
            }
        }
    }
};

export default Book;