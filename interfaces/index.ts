import { Dispatch, SetStateAction } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { WithStyles } from "@material-ui/core/styles";

import { CredModel } from "db/cred/model";
import { ChatMessageModel } from "db/message/model";
import { OperationPostModel } from "db/post/model";

export type MuiStyles = WithStyles<string>;
export type SetState<T> = Dispatch<SetStateAction<T>>;

export type APIFunctionObject = { [key: string]: (res: NextApiResponse<unknown>, req: NextApiRequest, user: UserSessionObject) => void };

export type UserSessionObject = {
    id: string;
    username: string;
    nickname: string;
    color: string;
};

export type ChatMessage = ChatMessageModel & { user: UserSessionObject };
export type OperationPost = OperationPostModel & { author: UserSessionObject };
export type Credential = CredModel & { id: string };
