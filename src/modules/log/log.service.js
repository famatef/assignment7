import Log from "../../DB/models/log.model.js";


// Q3
export const createLogsCollection = async () => {

    const collections = await Log.db.listCollections({
        name: "logs"
    }).toArray();

    if (collections.length > 0) {

        return {
            message: "Logs collection already exists"
        };
    }

    await Log.db.createCollection("logs", {
        capped: true,
        size: 1024 * 1024
    });

    return {
        message: "Capped logs collection created successfully"
    };
};


// Q7
export const addLog = async (logData) => {

    const result = await Log.insertOne(logData);

    return result;
};