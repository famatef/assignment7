import {
    createAuthor as createAuthorService
} from "./author.service.js";


export const createAuthor = async (req, res) => {

    try {

        const result =
            await createAuthorService(req.body);

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });
    }
};