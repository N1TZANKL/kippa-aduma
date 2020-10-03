import { WithStyles } from "@material-ui/core/styles";

import { ChatMessageModel } from "db/models/message";

export type MuiStyles = WithStyles<string>;
export type Children = React.ReactNode;

export type PageLayoutProps = MuiStyles & { children: Children };

export type UserSessionObject = {
    id: string;
    username: string;
    nickname: string;
    color: string;
};

export type SessionObject = { user: UserSessionObject };

export type ChatMessage = ChatMessageModel & SessionObject;

export enum OperationPostTypes {
    UPDATE = "update", // default
    RECON = "recon",
    ACTION = "action",
    ACHIEVEMENT = "achievement",
    BURN = "burn",
}

export type OperationPostAttachment = string; //change

export type OperationPost = {
    author: UserSessionObject;
    title?: string;
    description: string;
    additionalInformation: string;
    type: OperationPostTypes;
    writtenAt: string;
    happenedAt: string;
    attachments?: Array<OperationPostAttachment>;
};
