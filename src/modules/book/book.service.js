import Book, { bookValidation } from "../../DB/models/book.model.js";


// Q1
export const createBooksCollection = async () => {

    const collections = await Book.db.listCollections({
        name: "books"
    }).toArray();

    if (collections.length > 0) {
        return {
            message: "Books collection already exists"
        };
    }

    await Book.db.createCollection("books", {
        validator: {
            $jsonSchema: bookValidation.$jsonSchema
        },
        validationLevel: "strict",
        validationAction: "error"
    });

    return {
        message: "Books collection created successfully"
    };
};


// Q4
export const createBooksIndex = async () => {

    const result = await Book.createIndex({
        title: 1
    });

    return {
        message: "Index created successfully",
        index: result
    };
};


// Q5
export const addBook = async (bookData) => {

    const result = await Book.insertOne(bookData);

    return result;
};


// Q6
export const addBooks = async (books) => {

    const result = await Book.insertMany(books);

    return result;
};


// Q8
export const updateFutureBook = async () => {

    const result = await Book.updateOne(
        {
            title: "Future"
        },
        {
            $set: {
                year: 2022
            }
        }
    );

    return result;
};


// Q9
export const findBookByTitle = async (title) => {

    const result = await Book.findOne({
        title: title
    });

    return result;
};


// Q10
export const findBooksByYear = async (from, to) => {

    const result = await Book.find({
        year: {
            $gte: from,
            $lte: to
        }
    }).toArray();

    return result;
};


// Q11
export const findBooksByGenre = async (genre) => {

    const result = await Book.find({
        genres: genre
    }).toArray();

    return result;
};


// Q12
export const skipLimitBooks = async () => {

    const result = await Book.find({})
        .sort({
            year: -1
        })
        .skip(2)
        .limit(3)
        .toArray();

    return result;
};


// Q13
export const findBooksWithIntegerYear = async () => {

    const result = await Book.find({
        year: {
            $type: "int"
        }
    }).toArray();

    return result;
};


// Q14
export const findBooksWithoutExcludedGenres = async () => {

    const result = await Book.find({
        genres: {
            $nin: [
                "Horror",
                "Science Fiction"
            ]
        }
    }).toArray();

    return result;
};


// Q15
export const deleteBooksBeforeYear = async (year) => {

    const result = await Book.deleteMany({
        year: {
            $lt: year
        }
    });

    return result;
};


// Q16
export const aggregateBooks1 = async () => {

    const result = await Book.aggregate([
        {
            $match: {
                year: {
                    $gt: 2000
                }
            }
        },
        {
            $sort: {
                year: -1
            }
        }
    ]).toArray();

    return result;
};


// Q17
export const aggregateBooks2 = async () => {

    const result = await Book.aggregate([
        {
            $match: {
                year: {
                    $gt: 2000
                }
            }
        },
        {
            $project: {
                _id: 0,
                title: 1,
                author: 1,
                year: 1
            }
        }
    ]).toArray();

    return result;
};


// Q18
export const aggregateBooks3 = async () => {

    const result = await Book.aggregate([
        {
            $unwind: "$genres"
        }
    ]).toArray();

    return result;
};


// Q19
export const aggregateBooks4 = async () => {

    const result = await Book.aggregate([
        {
            $lookup: {
                from: "logs",
                localField: "title",
                foreignField: "bookTitle",
                as: "logs"
            }
        }
    ]).toArray();

    return result;
};