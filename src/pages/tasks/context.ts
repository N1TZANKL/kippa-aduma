import React from "react";

import { Task } from "src/utils/interfaces";
import { UserSessionObject } from "utils/session";

const TasksContext = React.createContext({
    users: [] as UserSessionObject[],
    user: {} as UserSessionObject,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    addTask: (task: Task) => {},
    replaceTask: (task: Task) => {},
    deleteTask: (taskId: string) => {},
    /* eslint-enable @typescript-eslint/no-unused-vars */
});

export default TasksContext;
