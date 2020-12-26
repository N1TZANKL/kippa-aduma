import React from "react";

import { Assignment } from "src/utils/interfaces";
import { UserSessionObject } from "utils/session";

const AssignmentsContext = React.createContext({
    users: [] as UserSessionObject[],
    user: {} as UserSessionObject,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    addAssignment: (assignment: Assignment) => {},
    replaceAssignment: (assignment: Assignment) => {},
    deleteAssignment: (assignmentId: string) => {},
    /* eslint-enable @typescript-eslint/no-unused-vars */
});

export default AssignmentsContext;
