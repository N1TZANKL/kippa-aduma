import { WithStyles } from "@material-ui/core/styles";

import { ChatMessageModel } from "db/models/message";

export type MuiStyles = WithStyles<string>;
export type Children = React.ReactNode;

export type PageLayoutProps = MuiStyles & { children: Children };

export type UserSessionObject = {
    username: string;
    nickname: string;
    color: string;
    id?: string;
};

export type SessionObject = { user: UserSessionObject };

export type ChatMessage = ChatMessageModel & SessionObject;
