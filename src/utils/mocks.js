import * as muiColors from "@material-ui/core/colors";
import { AssignmentStatuses } from "server/db/assignment/model";
import { OperationPostTypes } from "server/db/post/model";

const LONG_STRING =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the";
const LONG_STRING_WITH_LINE_BREAKS = `testing\n 1 2 3\n${LONG_STRING}`;

const CURRENT_TIME_STRING = new Date().toISOString();

export const CURRENT_USER = {
    username: "nitzan",
    nickname: "nitz",
    color: muiColors.purple[400],
    online: true,
    id: "1",
};

export const ALL_USERS = [
    CURRENT_USER,
    {
        username: "redhood",
        nickname: "redhood",
        color: muiColors.red[300],
        online: false,
        id: "2",
    },
    {
        username: "Jennifer Lawrence",
        nickname: "JLaw",
        color: muiColors.cyan[200],
        online: true,
        id: "3",
    },
];

export const DUMMY_CHAT_MESSAGES = [
    {
        type: "text",
        message: LONG_STRING_WITH_LINE_BREAKS,
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

export const DUMMY_OPERATION_POSTS = [
    {
        author: CURRENT_USER,
        title: "this is the post title",
        description: LONG_STRING_WITH_LINE_BREAKS + LONG_STRING_WITH_LINE_BREAKS,
        additionalInformation: LONG_STRING_WITH_LINE_BREAKS,
        type: OperationPostTypes.BURN,
        writtenAt: CURRENT_TIME_STRING,
        happenedAt: "2020-08-28T11:42:47.237Z",
    },
    {
        author: ALL_USERS[1],
        description: "testing testing",
        type: OperationPostTypes.ACTION,
        writtenAt: "2020-08-22T11:42:47.237Z",
        happenedAt: "2020-08-22T11:42:47.237Z",
        attachments: ["lala.txt", "test.clsx", "this_is_a_long_one_lolololol.idk"],
    },
    {
        author: ALL_USERS[1],
        description: "testing testing",
        type: OperationPostTypes.SUCCESS,
        writtenAt: "2020-08-26T12:55:47.237Z",
        happenedAt: "2020-08-26T12:55:47.237Z",
    },
    {
        author: CURRENT_USER,
        description: LONG_STRING + LONG_STRING,
        type: OperationPostTypes.RECON,
        writtenAt: "2020-08-26T11:42:47.237Z",
        happenedAt: "2020-08-25T11:42:47.237Z",
    },
];

export const DUMMY_ASSIGNMENTS = [
    {
        id: "1",
        status: AssignmentStatuses.TODO,
        description: "this is a test!",
        changedAt: new Date().toISOString(),
        creator: CURRENT_USER,
    },
    {
        id: "2",
        status: AssignmentStatuses.TODO,
        description: "this is another test!",
        changedAt: new Date().toISOString(),
        creator: CURRENT_USER,
    },
    {
        id: "3",
        status: AssignmentStatuses.IN_PROGRESS,
        description: "now this is an even bigger test than the ones that came before it!!",
        changedAt: new Date().toISOString(),
        deadlineAt: new Date("11-26-2020").toISOString(),
        creator: ALL_USERS[1],
        assignee: CURRENT_USER,
    },
    {
        id: "4",
        status: AssignmentStatuses.DONE,
        description: "now this is an even bigger test than the ones that came before it that came before it!!",
        changedAt: new Date("08-02-2021").toISOString(),
        creator: ALL_USERS[1],
        assignee: ALL_USERS[1],
    },
];
