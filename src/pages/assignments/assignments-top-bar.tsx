import React from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";

import { PanelButton } from "src/components/general/Panel";
import SearchBox from "src/components/general/SearchBox";

export default function AssignmentsTopBar(props: BoxProps) {
    return (
        <Box display="flex" {...props}>
            <PanelButton color="secondary" /* onClick={toggleFormOpen} */>
                <EditIcon />
                Create
            </PanelButton>
            <SearchBox placeholder="Search assignment by text, assignee..." value={""} onChange={(e) => {}} width={350} margin="0 10px 0 20px" />
            <PanelButton variant="text">Only My Assignments</PanelButton>
        </Box>
    );
}
