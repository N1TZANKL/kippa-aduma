import React, { useEffect, useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { mdiKeyStar, mdiNotebookEdit } from "@mdi/js";
import clsx from "clsx";
import Skeleton from "@material-ui/lab/Skeleton";

import { MuiStyles, Credential, OperationPost } from "src/utils/interfaces";
import Panel, { PanelTitle, PanelIconStat } from "src/components/general/Panel";
import { spaceChildren } from "src/utils/helpers/css";
import DataTypeText from "src/components/general/DataTypeText";
import { Get } from "src/utils/helpers/api";
import { firstLetterUppercase } from "src/utils/helpers/strings";
import UserListItem from "src/components/general/UserListItem";

const styles = () =>
    createStyles({
        root: {
            justifyContent: "space-evenly",
            padding: "15px 25px",
        },
        highlightsWrapper: {
            display: "flex",
            justifyContent: "center",
            ...spaceChildren("horizontally", 12),
            marginTop: 10,
            height: "70%",
            width: "100%",
        },
        credHighlight: {
            flexBasis: "39%",
        },
        postHighlight: {
            flexBasis: "59%",
        },
        longText: {
            // whiteSpace: "pre-wrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": 2,
            "-webkit-box-orient": "vertical",
            wordBreak: "break-word",
        },
        dataType: {
            padding: "0 5px",
            lineHeight: 1.15,
        },
        postAuthor: {
            display: "inline-block",
        },
        highlight: {
            // display: "flex",
            margin: "2px 0",
        },
    });

type StringProp = { children: string };

const HighlightTitle = ({ children }: StringProp) => <b>{children}: </b>;

const Highlight = withStyles(styles)(({ classes, ...props }: MuiStyles) => <div className={classes.highlight} {...props} />);

const DataType = withStyles(styles)(({ children, classes }: StringProp & MuiStyles) => (
    <DataTypeText variant="caption" className={classes.dataType}>
        {firstLetterUppercase(children)}
    </DataTypeText>
));

const PossiblyLongText = withStyles(styles)(({ children = "(None)", classes }: MuiStyles & { children?: string }) => (
    <span className={classes.longText}>{children.replace(/\n/g, " ↵ ")}</span>
));

type RecentHighlightsPanelProps = MuiStyles & { className: string };

function RecentHighlightsPanel({ classes, className }: RecentHighlightsPanelProps) {
    const [recentCred, setRecentCred] = useState<Credential | null>(null);
    const [recentPost, setRecentPost] = useState<OperationPost | null>(null);

    useEffect(() => {
        const fetchHighlights = async () => {
            const res = await Get("general/recent-highlights");
            const data = await res.json();
            setRecentCred(data.cred);
            setRecentPost(data.post);
        };
        fetchHighlights();
    }, []);

    return (
        <Panel className={clsx(className, classes.root)}>
            <PanelTitle>Recent Highlights</PanelTitle>
            <div className={classes.highlightsWrapper}>
                {recentCred ? (
                    <PanelIconStat title="Newest credential" icon={mdiKeyStar} className={classes.credHighlight}>
                        <Highlight>
                            <HighlightTitle>Username</HighlightTitle> {recentCred.username}
                        </Highlight>
                        <Highlight>
                            <HighlightTitle>Type</HighlightTitle> <DataType>{recentCred.type}</DataType>
                        </Highlight>
                        <Highlight>
                            <HighlightTitle>More Info</HighlightTitle>
                            <PossiblyLongText>{recentCred.additionalInformation}</PossiblyLongText>
                        </Highlight>
                    </PanelIconStat>
                ) : (
                    <Skeleton className={classes.credHighlight} height="100%" />
                )}
                {recentPost ? (
                    <PanelIconStat title="Newest Post" icon={mdiNotebookEdit} className={classes.postHighlight}>
                        <Highlight>
                            <HighlightTitle>Type</HighlightTitle> <DataType>{recentPost.type}</DataType>
                        </Highlight>
                        <Highlight>
                            <HighlightTitle>Written By</HighlightTitle>
                            <UserListItem {...recentPost.author} avatarSize={22} className={classes.postAuthor} />
                        </Highlight>
                        <Highlight>
                            <HighlightTitle>{recentPost.title ? "Title" : "Description"}</HighlightTitle>
                            <PossiblyLongText>{recentPost.title || recentPost.description}</PossiblyLongText>
                        </Highlight>
                    </PanelIconStat>
                ) : (
                    <Skeleton className={classes.postHighlight} height="100%" />
                )}
            </div>
        </Panel>
    );
}

export default withStyles(styles)(RecentHighlightsPanel);
