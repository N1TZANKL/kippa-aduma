module.exports = {
    env: {
        CHAT_PORT: process.env.CHAT_PORT,
        STORAGE_PORT: process.env.STORAGE_PORT,
        HOST: process.env.HOST,
        MONGO_CONNECTION_STRING: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:27017/${
            process.env.DB_NAME
        }${process.env.NODE_ENV === "production" ? "" : "?synchronize=true"}`,
    },
};
