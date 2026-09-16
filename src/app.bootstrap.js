import express from "express";

import {
    connectionDB
} from "./DB/connectionDB.js";

import {
    createBooks,
    createIndex,
    createBook,
    createBooksBatch,
    updateBook,
    getBookByTitle,
    getBooksByYear,
    getBooksByGenre,
    getSkipLimit,
    getYearInteger,
    getExcludeGenres,
    deleteBooksBefore,
    getAggregate1,
    getAggregate2,
    getAggregate3,
    getAggregate4
} from "./modules/book/book.controller.js";

import {
    createAuthor
} from "./modules/author/author.controller.js";

import {
    createLogs,
    createLog
} from "./modules/log/log.controller.js";


export const bootstrap = async () => {

    const app = express();

    app.use(express.json());



    app.post(
        "/collection/books",
        createBooks
    );

    app.post(
        "/collection/books/index",
        createIndex
    );


    
    app.post(
        "/books",
        createBook
    );

    app.post(
        "/books/batch",
        createBooksBatch
    );

    app.patch(
        "/books/Future",
        updateBook
    );

    app.get(
        "/books/title",
        getBookByTitle
    );

    app.get(
        "/books/year",
        getBooksByYear
    );

    app.get(
        "/books/genre",
        getBooksByGenre
    );

    app.get(
        "/books/skip-limit",
        getSkipLimit
    );

    app.get(
        "/books/year-integer",
        getYearInteger
    );

    app.get(
        "/books/exclude-genres",
        getExcludeGenres
    );

    app.delete(
        "/books/before-year",
        deleteBooksBefore
    );

    app.get(
        "/books/aggregate1",
        getAggregate1
    );

    app.get(
        "/books/aggregate2",
        getAggregate2
    );

    app.get(
        "/books/aggregate3",
        getAggregate3
    );

    app.get(
        "/books/aggregate4",
        getAggregate4
    );


    
    app.post(
        "/collection/authors",
        createAuthor
    );


    

    app.post(
        "/collection/logs/capped",
        createLogs
    );

    app.post(
        "/logs",
        createLog
    );


    

    await connectionDB();


    
    app.listen(3000, () => {

        console.log(
            "Server running on port 3000"
        );

    });

};

export default bootstrap;