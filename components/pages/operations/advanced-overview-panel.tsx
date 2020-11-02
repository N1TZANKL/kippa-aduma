import React, { useMemo } from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles, OperationPost } from "interfaces";
import Panel, { PanelButton, PanelStat, PanelTitle } from "components/general/Panel";
import { notFirstChild, spaceChildren } from "utils/helpers/css";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { areSameDates } from "utils/helpers/dates";
import { filterDuplicatesFromArray } from "utils/helpers/objects";
import { OperationPostTypes } from "db/models/post";
import { PostTypeToColor } from "./timeline/post";
import { firstLetterUppercase } from "utils/helpers/strings";

const styles = (theme: Theme) =>
    createStyles({
        buttons: {
            margin: "10px 0",
            display: "flex",
            flexDirection: "column",
            ...spaceChildren("vertically", 10),
            "& > *": {
                height: 40,
            },
        },
        icon: { marginRight: "10px !important" },
        stats: {
            "& > *": {
                marginTop: 10,
                minHeight: 100,
            },
            ...notFirstChild({ marginTop: 20 }),
        },
        userText: {
            fontStyle: "italic",
            fontWeight: "bold",
        },
        postTypeLine: {
            display: "flex",
            alignItems: "center",
            marginTop: 6,
            textAlign: "center",
            justifyContent: "center",
            "& > *": {
                margin: "0 4px",
            },
        },
    });

type AdvancedOverviewPanelProps = MuiStyles & { className: string; posts: Array<OperationPost> };
function AdvancedOverviewPanel(props: AdvancedOverviewPanelProps) {
    const { classes, className, posts } = props;

    const postsFromToday = useMemo(() => posts.filter((post: OperationPost) => areSameDates(new Date().toISOString(), post.writtenAt)), [posts]);
    const todaysPostAuthors = filterDuplicatesFromArray(postsFromToday.map((post: OperationPost) => post.author.nickname));

    const postTypesToAmount = useMemo(() => {
        // initialize object
        const typeToAmount = {} as { [key: string]: number };
        for (const postType of Object.values(OperationPostTypes)) {
            typeToAmount[postType] = 0;
        }

        // fill object with values
        for (const post of posts) {
            typeToAmount[post.type] = typeToAmount[post.type] + 1;
        }

        // remove types that were not used
        for (const [key, value] of Object.entries(typeToAmount)) {
            if (!value) delete typeToAmount[key];
        }

        return typeToAmount;
    }, [posts]);

    const differentPostTypesAmount = Object.keys(postTypesToAmount).length;

    return (
        <Panel className={className}>
            <PanelTitle>Advanced Options</PanelTitle>
            <div className={classes.buttons}>
                <PanelButton>
                    <SaveAltIcon className={classes.icon} />
                    Export as PDF
                </PanelButton>
                To be implemented!
            </div>
            <PanelTitle>Overview</PanelTitle>
            <div className={classes.stats}>
                <PanelStat title={`${posts.length} Posts written overall`}>since operation started</PanelStat>
                <PanelStat title={`${postsFromToday.length} Post${postsFromToday.length !== 1 ? "s" : ""} written today`}>
                    {todaysPostAuthors.length !== 1 ? (
                        `by ${todaysPostAuthors.length} different people`
                    ) : (
                        <>
                            By User <span className={classes.userText}>{todaysPostAuthors[0]}</span>
                        </>
                    )}
                </PanelStat>
                <PanelStat title={differentPostTypesAmount === 1 ? "One post type used:" : `${differentPostTypesAmount} post types used:`}>
                    {differentPostTypesAmount === 0
                        ? "(none used)"
                        : Object.entries(postTypesToAmount).map(([key, value]) => (
                              <div key={key} className={classes.postTypeLine}>
                                  <i style={{ color: PostTypeToColor[key] }}>{firstLetterUppercase(key)}</i>{" "}
                                  <span>
                                      ({value} post{value !== 1 ? "s" : ""})
                                  </span>
                              </div>
                          ))}
                </PanelStat>
            </div>
        </Panel>
    );
}

export default withStyles(styles)(AdvancedOverviewPanel);
