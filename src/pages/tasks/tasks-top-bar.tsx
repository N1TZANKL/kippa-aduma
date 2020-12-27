import React, { useState } from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";

import { PanelButton } from "src/components/general/Panel";
import SearchBox from "src/components/general/SearchBox";
import { SetState } from "src/utils/interfaces";
import FormDialog from "src/components/dialogs/FormDialog";

import CreateTaskForm from "./create-task-form";

type TasksTopBarProps = BoxProps & {
    toggleShowOwnFilter: () => void;
    showOwnTasksOnly: boolean;
    onSearch: SetState<string>;
    searchString?: string;
};

// TODO: Create task form context instead of passing all these props

export default function TasksTopBar(props: TasksTopBarProps): JSX.Element {
    const { toggleShowOwnFilter, showOwnTasksOnly, onSearch, searchString = "", ...boxProps } = props;

    const [formOpen, setFormOpen] = useState(false);
    const toggleFormOpen = () => setFormOpen((prev) => !prev);

    return (
        <Box display="flex" {...boxProps}>
            <PanelButton color="secondary" onClick={toggleFormOpen}>
                <EditIcon />
                Create
            </PanelButton>
            <SearchBox
                placeholder="Search task by text, assignee..."
                value={searchString}
                onChange={(e) => onSearch(e.target.value)}
                width={350}
                margin="0 10px 0 20px"
            />
            <PanelButton variant="text" onClick={toggleShowOwnFilter} color={showOwnTasksOnly ? "secondary" : "default"}>
                Only My Tasks {showOwnTasksOnly ? "[ON]" : ""}
            </PanelButton>
            <FormDialog title="Create Task" open={formOpen} onClose={toggleFormOpen}>
                <CreateTaskForm onClose={toggleFormOpen} />
            </FormDialog>
        </Box>
    );
}
