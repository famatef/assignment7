import {
    createBooksCollection,
    createBooksIndex,
    addBook,
    addBooks,
    updateFutureBook,
    findBookByTitle,
    findBooksByYear,
    findBooksByGenre,
    skipLimitBooks,
    findBooksWithIntegerYear,
    findBooksWithoutExcludedGenres,
    deleteBooksBeforeYear,
    aggregateBooks1,
    aggregateBooks2,
    aggregateBooks3,
    aggregateBooks4,
} from "./book.service.js";

export const createBooks = async (req, res) => {
    try {
        const result = await createBooksCollection();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createIndex = async (req, res) => {
    try {
        const result = await createBooksIndex();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createBook = async (req, res) => {
    try {
        const result = await addBook(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createBooksBatch = async (req, res) => {
    try {
        const result = await addBooks(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateBook = async (req, res) => {
    try {
        const result = await updateFutureBook();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBookByTitle = async (req, res) => {
    try {
        const title = req.query.title ?? req.body?.title;
        const result = await findBookByTitle(title);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBooksByYear = async (req, res) => {
    try {
        const from = Number(req.query.from ?? req.body?.from);
        const to = Number(req.query.to ?? req.body?.to);
        const result = await findBooksByYear(from, to);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBooksByGenre = async (req, res) => {
    try {
        const genre = req.query.genre ?? req.body?.genre;
        const result = await findBooksByGenre(genre);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getSkipLimit = async (req, res) => {
    try {
        const result = await skipLimitBooks();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getYearInteger = async (req, res) => {
    try {
        const result = await findBooksWithIntegerYear();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getExcludeGenres = async (req, res) => {
    try {
        const result = await findBooksWithoutExcludedGenres();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBooksBefore = async (req, res) => {
    try {
        const year = Number(req.query.year ?? req.body?.year);
        const result = await deleteBooksBeforeYear(year);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAggregate1 = async (req, res) => {
    try {
        const result = await aggregateBooks1();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAggregate2 = async (req, res) => {
    try {
        const result = await aggregateBooks2();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAggregate3 = async (req, res) => {
    try {
        const result = await aggregateBooks3();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAggregate4 = async (req, res) => {
    try {
        const result = await aggregateBooks4();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};