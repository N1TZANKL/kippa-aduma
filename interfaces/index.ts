import { WithStyles } from "@material-ui/core/styles";
import { ObjectId } from "mongodb";

export type MuiStyles = WithStyles<string>;
export type Children = React.ReactNode;

export type PageLayoutProps = MuiStyles & { children: Children };

type BaseChatMessage = {
    type: "text" | "file";
    message: string; // the message text / file name
    timestamp: string; // TODO: change type to be more specific?
    // save the userId only and inflate?
    fileSize?: number;
    fileType?: string;
};

export type DbChatMessage = BaseChatMessage & {
    user: ObjectId;
}

export type ChatMessage = BaseChatMessage & {
    user: UserSessionObject;
}

export type UserSessionObject = {
    username: string;
    nickname: string;
    color: string;
};

export type SessionObject = {
    user: UserSessionObject;
};
