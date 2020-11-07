import React, { Dispatch, SetStateAction } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { WithStyles } from "@material-ui/core/styles";

import { CredModel } from "db/cred/model";
import { ChatMessageModel } from "db/message/model";
import { OperationPostModel } from "db/post/model";

export type MuiStyles = WithStyles<string>;
export type Children = React.ReactNode;
export type SetState<T> = Dispatch<SetStateAction<T>>;

export type StringObject = { [key: string]: string };
export type NumberObject = { [key: string]: number };
export type GenericObject = Record<string, unknown>;
export type APIFunctionObject = { [key: string]: (res: NextApiResponse<unknown>, req: NextApiRequest, user: UserSessionObject) => void };

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
export type Credential = CredModel & { id: string };
