import { Dispatch, SetStateAction } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { WithStyles } from "@material-ui/core/styles";

import { CredModel } from "server/db/cred/model";
import { ChatMessageModel } from "server/db/message/model";
import { OperationPostModel } from "server/db/post/model";
import { UserSessionObject } from "utils/session";
import { TaskModel } from "server/db/task/model";

export type MuiStyles = WithStyles<string>;
export type SetState<T> = Dispatch<SetStateAction<T>>;

export type APIFunctionObject = { [key: string]: (res: NextApiResponse<unknown>, req: NextApiRequest, user: UserSessionObject) => void };

export type ChatMessage = Omit<ChatMessageModel, "user"> & { user: UserSessionObject };

export type OperationPost = Omit<OperationPostModel, "author"> & { author: UserSessionObject; id: string };

export type Credential = CredModel & { id: string };

export type Task = Omit<TaskModel, "creator" | "assignee"> & { creator: UserSessionObject; assignee?: UserSessionObject; id: string };
