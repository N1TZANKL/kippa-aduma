import { WithStyles } from "@material-ui/core/styles";
import { CredModel } from "db/models/cred";

import { ChatMessageModel } from "db/models/message";
import { OperationPostModel } from "db/models/post";

export type MuiStyles = WithStyles<string>;
export type Children = React.ReactNode;

export type StringObject = { [key: string]: string };

export type PageLayoutProps = MuiStyles & { children: Children };

export type UserSessionObject = {
    id: string;
    username: string;
    nickname: string;
    color: string;
};

export type SessionObject = { user: UserSessionObject };

export type ChatMessage = ChatMessageModel & SessionObject;
export type OperationPost = OperationPostModel & { author: UserSessionObject };
export type Credential = CredModel & {id: string};
