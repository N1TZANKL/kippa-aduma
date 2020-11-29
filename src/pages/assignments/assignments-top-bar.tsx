import React, { useState } from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";

import { PanelButton } from "src/components/general/Panel";
import SearchBox from "src/components/general/SearchBox";
import { Assignment, SetState } from "src/utils/interfaces";
import { UserSessionObject } from "utils/session";
import CreateAssignmentForm from "./create-assignment-form";
import FormDialog from "src/components/dialogs/FormDialog";

type AssignmentsTopBarProps = BoxProps & {
    users?: UserSessionObject[];
    addAssignment: (newAssignment: Assignment) => void;
    toggleShowOwnFilter: () => void;
    showOwnAssignmentsOnly: boolean;
    onSearch: SetState<string>;
    searchString?: string;
};

// TODO: Create assignment form context instead of passing all these props

export default function AssignmentsTopBar(props: AssignmentsTopBarProps) {
    const { users = [], addAssignment, toggleShowOwnFilter, showOwnAssignmentsOnly, onSearch, searchString = "", ...boxProps } = props;

    const [formOpen, setFormOpen] = useState(false);
    const toggleFormOpen = () => setFormOpen((prev) => !prev);

    return (
        <Box display="flex" {...boxProps}>
            <PanelButton color="secondary" onClick={toggleFormOpen}>
                <EditIcon />
                Create
            </PanelButton>
            <SearchBox
                placeholder="Search assignment by text, assignee..."
                value={searchString}
                onChange={(e) => onSearch(e.target.value)}
                width={350}
                margin="0 10px 0 20px"
            />
            <PanelButton variant="text" onClick={toggleShowOwnFilter} color={showOwnAssignmentsOnly ? "secondary" : "default"}>
                Only My Assignments {showOwnAssignmentsOnly ? "[ON]" : ""}
            </PanelButton>
            <FormDialog title="Create Assignment" open={formOpen} onClose={toggleFormOpen}>
                <CreateAssignmentForm addAssignment={addAssignment} onClose={toggleFormOpen} users={users} />
            </FormDialog>
        </Box>
    );
}
