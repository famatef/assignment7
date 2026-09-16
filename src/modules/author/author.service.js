import Author from "../../DB/models/author.model.js";



export const createAuthor = async (authorData) => {

    const result = await Author.insertOne(authorData);

    return result;
};