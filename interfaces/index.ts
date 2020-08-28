import { WithStyles } from "@material-ui/core/styles";

export type MuiStyles = WithStyles<string>;
export type Children = React.ReactNode;

export type PageLayoutProps = MuiStyles & { children: Children };

export type ChatMessage = {
    type: "text" | "file";
    message: string; // the message text / file name
    timestamp: string; // TODO: change type to be more specific?
    user: UserSessionObject;
    fileSize?: number;
    fileType?: string;
};

export type UserSessionObject = {
    username: string;
    nickname: string;
    color: string;
};

export type SessionObject = {
    user: UserSessionObject;
};
