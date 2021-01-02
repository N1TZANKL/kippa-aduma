import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";

import { MuiStyles } from "src/utils/interfaces";
import Panel, { ComingSoon, PanelTitle } from "src/components/general/Panel";

const styles = () =>
    createStyles({
        subtitle: { marginTop: 35 },
    });

type LatestActivitiesPanelProps = MuiStyles & { className: string };

function LatestActivitiesPanel({ classes, className }: LatestActivitiesPanelProps) {
    return (
        <Panel className={className}>
            <PanelTitle>Latest Activities</PanelTitle>
            <ComingSoon className={classes.subtitle} />
        </Panel>
    );
}

export default withStyles(styles)(LatestActivitiesPanel);
