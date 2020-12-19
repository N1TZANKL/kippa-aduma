import React, { useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { resetServerContext } from "react-beautiful-dnd";

import PageLayout from "src/components/layouts/MainLayout";
import { UserSessionObject, withUserSession } from "utils/session";
import { AssignmentsTopBar, AssignmentBoards } from "src/pages/assignments/";
import { Assignment, MuiStyles } from "src/utils/interfaces";
import { getAllUsers } from "server/db/user/controller";
import { getAllAssignments } from "server/db/assignment/controller";

const styles = createStyles({
    root: {
        width: "100%",
        minWidth: 725,
        padding: 15,
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        // minHeight: 400,
    },
    panelsWrapper: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        flexGrow: 1,
    },
});

type AssignmentsProps = MuiStyles & { user: UserSessionObject; assignments?: Assignment[]; users?: UserSessionObject[] };

function Assignments({ classes, user, users, assignments = [] }: AssignmentsProps): JSX.Element {
    const [searchString, setSearchString] = useState("");

    const [showOwnAssignmentsOnly, setShowOwnAssignments] = useState(false);
    const toggleShowOwnFilter = () => setShowOwnAssignments((prevState) => !prevState);

    const [allAssignments, setAssignments] = useState(assignments);

    const addAssignment = (newAssignment: Assignment) => setAssignments((prevState) => [...prevState, newAssignment]);

    function replaceAssignment(assignment: Assignment) {
        setAssignments((prevState) => [...prevState.filter((a) => a.id !== assignment.id), assignment]);
    }

    const filteredSortedAssignments = allAssignments
        .filter((assignment) => {
            // filter by own-assignments filter
            if (showOwnAssignmentsOnly && assignment.assignee?.username !== user.username) return false;

            // filter by search string
            if (searchString && !Object.values(assignment).some((p: unknown) => p && typeof p === "string" && p.match(searchString))) return false;

            return true;
        })
        .reverse();

    return (
        <PageLayout noPadding user={user}>
            <div className={classes.root}>
                <AssignmentsTopBar
                    height="45px"
                    users={users}
                    user={user}
                    searchString={searchString}
                    onSearch={setSearchString}
                    toggleShowOwnFilter={toggleShowOwnFilter}
                    showOwnAssignmentsOnly={showOwnAssignmentsOnly}
                    addAssignment={addAssignment}
                />
                <div className={classes.panelsWrapper}>
                    <AssignmentBoards assignments={filteredSortedAssignments} replaceAssignment={replaceAssignment} />
                </div>
            </div>
        </PageLayout>
    );
}

export default withStyles(styles)(Assignments);

export const getServerSideProps = withUserSession(async () => {
    const props: Omit<AssignmentsProps, "user" | "classes"> = {};

    const allUsersPromise = getAllUsers()
        .then((data) => {
            props.users = data;
        })
        .catch(() => {
            props.users = undefined;
        });

    const allAssignmentsPromise = getAllAssignments()
        .then((data) => {
            props.assignments = data;
        })
        .catch(() => {
            props.assignments = undefined;
        });

    await Promise.all([allUsersPromise, allAssignmentsPromise]);

    // this shit is called to prevent errors from react-beautiful-dnd library,
    // which is used to animate the assignment drag-and-drop
    resetServerContext();

    return { props };
});
