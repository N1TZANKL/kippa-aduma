import { Dispatch, SetStateAction } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { WithStyles } from "@material-ui/core/styles";

import { CredModel } from "server/db/cred/model";
import { ChatMessageModel } from "server/db/message/model";
import { OperationPostModel } from "server/db/post/model";
import { UserSessionObject } from "utils/session";

export type MuiStyles = WithStyles<string>;
export type SetState<T> = Dispatch<SetStateAction<T>>;

export type APIFunctionObject = { [key: string]: (res: NextApiResponse<unknown>, req: NextApiRequest, user: UserSessionObject) => void };

export type ChatMessage = ChatMessageModel & { user: UserSessionObject };
export type OperationPost = OperationPostModel & { author: UserSessionObject };
export type Credential = CredModel & { id: string };
