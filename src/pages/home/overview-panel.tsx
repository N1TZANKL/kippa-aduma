import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { MuiStyles } from "src/utils/interfaces";
import { spaceChildren } from "src/utils/helpers/css";
import Panel, { PanelNumberStat, PanelTitle } from "src/components/general/Panel";

const styles = () =>
    createStyles({
        root: {
            justifyContent: "space-evenly",
        },
        stats: {
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
            ...spaceChildren("horizontally", 12),
            height: "70%",
            "& > *": {
                minWidth: 180,
                maxWidth: 215,
            },
        },
    });

type OverviewPanelProps = MuiStyles & { className: string };

function OverviewPanel({ classes, className }: OverviewPanelProps) {
    return (
        <Panel className={clsx(className, classes.root)}>
            <PanelTitle>Campaign Overview</PanelTitle>
            <div className={classes.stats}>
                <PanelNumberStat number={10} title={"Credentials gathered"} />
                <PanelNumberStat number={3} title={"Posts written"} />
                <PanelNumberStat number={5} title={"Tasks finished"} />
            </div>
        </Panel>
    );
}

export default withStyles(styles)(OverviewPanel);
