export const CURRENT_USER = {
    username: "nitzank",
    nickname: "nitz",
    color: "purple",
    online: true,
};

export const CURRENT_USER_NICKNAME = CURRENT_USER.nickname;
export const CURRENT_USER_COLOR = CURRENT_USER.color;

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
        color: "purple",
        nickname: "nitz",
        timestamp: new Date().toISOString(),
    },
    {
        type: "file",
        message: "thisisalongfilenameohmygoddddditsgonnaoverflow.tar.gz",
        fileSize: 3201230,
        color: "red",
        nickname: "redhood",
        timestamp: new Date().toISOString(),
        fileType: "tar.gz",
    },
    {
        type: "file",
        message: "test.txt",
        fileSize: 400,
        color: "purple",
        nickname: "nitz",
        timestamp: new Date().toISOString(),
        fileType: "txt",
    },
];
