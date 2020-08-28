export const CURRENT_USER = {
    username: "nitzan",
    nickname: "nitz",
    color: "purple",
    online: true,
};

export const ALL_USERS = [
    CURRENT_USER,
    {
        username: "redhood",
        nickname: "redhood",
        color: "red",
        online: false,
    },
    {
        username: "Jennifer Lawrence",
        nickname: "JLaw",
        color: "cyan",
        online: true,
    },
];

export const DUMMY_CHAT_MESSAGES = [
    {
        type: "text",
        message:
            "testing\n 1 2 3\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the",
        user: CURRENT_USER,
        timestamp: "2020-08-27T18:30:47.237Z",
    },
    {
        type: "file",
        message: "thisisalongfilenameohmygoddddditsgonnaoverflow.tar.gz",
        fileSize: 3201230,
        user: ALL_USERS[1],
        timestamp: "2020-08-28T11:42:47.237Z",
        fileType: "tar.gz",
    },
    {
        type: "file",
        message: "test.txt",
        fileSize: 400,
        user: CURRENT_USER,
        timestamp: "2020-08-28T11:43:47.237Z",
        fileType: "txt",
    },
];
