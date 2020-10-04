// This file defines the DB models.
// Mongoose will take the value of each key and add "s" to it to create the collection name

enum Models {
    SYSTEM_USER = "user",
    CHAT_MESSAGE = "message",
    OPERATION_POST = "post",
}

export default Models;
