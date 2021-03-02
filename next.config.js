module.exports = {
    env: {
        CHAT_PORT: process.env.CHAT_PORT,
        STORAGE_PORT: process.env.STORAGE_PORT,
        MONGO_CONNECTION_STRING: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${
            process.env.NODE_ENV === "production" ? process.env.MONGO_HOST : "localhost"
        }:27017/${process.env.DB_NAME}${process.env.NODE_ENV === "production" ? "" : "?synchronize=true"}`,
    },
};
