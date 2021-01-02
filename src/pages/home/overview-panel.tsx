import React, { useEffect, useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Skeleton from "@material-ui/lab/Skeleton";

import { MuiStyles } from "src/utils/interfaces";
import { spaceChildren } from "src/utils/helpers/css";
import Panel, { PanelNumberStat, PanelTitle } from "src/components/general/Panel";
import { Get } from "src/utils/helpers/api";

const styles = () =>
    createStyles({
        root: {
            justifyContent: "space-evenly",
            padding: "15px 25px",
        },
        stats: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
            ...spaceChildren("horizontally", 12),
            height: "70%",
            "& > *": {
                maxWidth: 215,
            },
        },
    });

type OverviewNumbers = { credsAmount: number; postsAmount: number; finishedTasksAmount: number };

type OverviewPanelProps = MuiStyles & { className: string };

function OverviewPanel({ classes, className }: OverviewPanelProps) {
    const [overviewNumbers, setOverviewNumbers] = useState<OverviewNumbers | null>(null);

    useEffect(() => {
        const fetchNumbers = async () => {
            const res = await Get("general/overview");
            const data = await res.json();
            setOverviewNumbers(data);
        };
        fetchNumbers();
    }, []);

    return (
        <Panel className={clsx(className, classes.root)}>
            <PanelTitle>Campaign Overview</PanelTitle>
            <div className={classes.stats}>
                {overviewNumbers ? (
                    <>
                        <PanelNumberStat number={overviewNumbers.credsAmount} title={"Credentials gathered"} />
                        <PanelNumberStat number={overviewNumbers.postsAmount} title={"Posts written"} />
                        <PanelNumberStat number={overviewNumbers.finishedTasksAmount} title={"Tasks finished"} />
                    </>
                ) : (
                    <>
                        <Skeleton width="30%" />
                        <Skeleton width="30%" />
                        <Skeleton width="30%" />
                    </>
                )}
            </div>
        </Panel>
    );
}

export default withStyles(styles)(OverviewPanel);
