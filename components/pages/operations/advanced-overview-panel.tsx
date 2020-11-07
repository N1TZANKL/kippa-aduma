import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import SaveAltIcon from "@material-ui/icons/SaveAlt";

import { MuiStyles, NumberObject, OperationPost } from "interfaces";
import Panel, { PanelButton, PanelStat, PanelTitle } from "components/general/Panel";
import { notFirstChild, spaceChildren } from "utils/helpers/css";
import { areSameDates } from "utils/helpers/dates";
import { filterDuplicatesFromArray } from "utils/helpers/objects";
import { OperationPostTypes } from "db/post/model";
import { firstLetterUppercase } from "utils/helpers/strings";

import { PostTypeToColor } from "./timeline/post/post-type-indicator";

const styles = () =>
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

    const postsFromToday = posts.filter((post: OperationPost) => areSameDates(new Date().toISOString(), post.writtenAt));
    const todaysPostAuthors = filterDuplicatesFromArray(postsFromToday.map((post: OperationPost) => post.author.nickname));

    const postTypesToAmount: NumberObject = {};
    Object.values(OperationPostTypes).forEach((postType) => {
        postTypesToAmount[postType] = 0;
    });

    // fill object with values
    posts.forEach((post) => {
        postTypesToAmount[post.type] += 1;
    });

    // remove types that were not used
    Object.entries(postTypesToAmount).forEach(([key, value]) => {
        if (!value) delete postTypesToAmount[key];
    });

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
