import React, { useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import PageLayout from "src/components/layouts/MainLayout";
import { UserSessionObject, withUserSession } from "utils/session";
import { AssignmentsTopBar, AssignmentsPanel } from "src/pages/assignments/";
import { Assignment, MuiStyles } from "src/utils/interfaces";
import { getAllUsers } from "server/db/user/controller";
import { getAllAssignments } from "server/db/assignment/controller";
import { AssignmentStatuses } from "server/db/assignment/model";

const styles = createStyles({
    root: {
        width: "100%",
        height: "100%",
        minWidth: 725,
        minHeight: 400,
        padding: 15,
    },
    panelsWrapper: {
        display: "flex",
        justifyContent: "space-between",
        height: "calc(100% - 45px)",
        width: "100%",
    },
});

type AssignmentsProps = MuiStyles & { user: UserSessionObject; assignments?: Assignment[]; users?: UserSessionObject[] };

function Assignments({ classes, user, users, assignments = [] }: AssignmentsProps): JSX.Element {
    const [searchString, setSearchString] = useState("");

    const [showOwnAssignmentsOnly, setShowOwnAssignments] = useState(false);
    const toggleShowOwnFilter = () => setShowOwnAssignments((prevState) => !prevState);

    function handleAssignmentStatusChange({ draggableId, destination, source }: DropResult) {
        console.log(draggableId, destination, source);
    }

    function filterSortAssignments(status: AssignmentStatuses) {
        let filteredAssignments = assignments.filter((a) => a.status === status).reverse();

        if (showOwnAssignmentsOnly) filteredAssignments = filteredAssignments.filter((a) => a.assignee?.username === user.username);

        if (!searchString) return filteredAssignments;

        return filteredAssignments.filter((assignment: Assignment) =>
            Object.values(assignment).some((p: unknown) => p && typeof p === "string" && p.match(searchString))
        );
    }

    return (
        <PageLayout noPadding user={user}>
            <div className={classes.root}>
                <AssignmentsTopBar
                    height="45px"
                    users={users}
                    searchString={searchString}
                    onSearch={setSearchString}
                    toggleShowOwnFilter={toggleShowOwnFilter}
                    showOwnAssignmentsOnly={showOwnAssignmentsOnly}
                />
                <div className={classes.panelsWrapper}>
                    <DragDropContext onDragEnd={handleAssignmentStatusChange}>
                        <AssignmentsPanel
                            flexBasis={"29%"}
                            marginRight="15px"
                            hiddenProps={{ smDown: true }}
                            status={AssignmentStatuses.TODO}
                            assignments={filterSortAssignments(AssignmentStatuses.TODO)}
                        />
                        <AssignmentsPanel
                            flexBasis={"40%"}
                            flexGrow={1}
                            status={AssignmentStatuses.IN_PROGRESS}
                            assignments={filterSortAssignments(AssignmentStatuses.IN_PROGRESS)}
                        />
                        <AssignmentsPanel
                            flexBasis={"29%"}
                            marginLeft="15px"
                            hiddenProps={{ mdDown: true }}
                            status={AssignmentStatuses.DONE}
                            assignments={filterSortAssignments(AssignmentStatuses.DONE)}
                        />
                    </DragDropContext>
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

    return { props };
});
