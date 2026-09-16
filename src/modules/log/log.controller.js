import {
    createLogsCollection,
    addLog
} from "./log.service.js";


// Q3
export const createLogs = async (req, res) => {

    try {

        const result =
            await createLogsCollection();

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });
    }
};


// Q7
export const createLog = async (req, res) => {

    try {

        const result =
            await addLog(req.body);

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });
    }
};