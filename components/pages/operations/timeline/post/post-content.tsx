import React, { useEffect, useRef, useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import * as muiColors from "@material-ui/core/colors";
import Collapse from "@material-ui/core/Collapse";
import Fade from "@material-ui/core/Fade";

import { isElementOverflowing } from "utils/helpers/css";
import { MuiStyles, OperationPost } from "interfaces";

import { PostTypeIndicatorStyle, POST_TYPE_INDICATOR_PLACEHOLDER } from "./post-type-indicator";

const styles = () =>
    createStyles({
        multilineText: {
            whiteSpace: "pre-wrap",
        },
        postContent: {
            lineHeight: 1.6,
            display: "flex",
            flexDirection: "column",
            marginTop: 8,
        },
        toggleExpandText: {
            // extract this CSS to LinkText component
            color: muiColors.lightBlue.A400,
            borderBottom: `1px solid ${muiColors.lightBlue.A400}`,
            width: "fit-content",
            marginTop: 3,
        },
        additionalInfoTitle: {
            marginTop: 15,
            fontWeight: "bold",
            color: muiColors.grey[400],
        },
        additionalInfo: {
            margin: "3px 0",
        },
        truncatedDescription: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": 5,
            "-webkit-box-orient": "vertical",
        },
        clickable: { cursor: "pointer" },
    });

type PostContentProps = MuiStyles & { post: OperationPost };

function PostContent(props: PostContentProps) {
    const [expanded, setExpanded] = useState(false);
    const [canExpand, setCanExpand] = useState(false);
    const descriptionRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const { classes, post } = props;
    const { title, additionalInformation, type } = post;

    useEffect(() => {
        setCanExpand(!!additionalInformation || expanded || isElementOverflowing(descriptionRef.current));
    }, [expanded, descriptionRef, additionalInformation]);

    function toggleExpanded() {
        setExpanded((prevState) => !prevState);
    }

    return (
        <Typography
            component="div"
            variant="body2"
            className={clsx(classes.postContent, canExpand && classes.clickable)}
            onClick={canExpand ? toggleExpanded : undefined}
        >
            <div
                ref={descriptionRef}
                className={clsx(classes.multilineText, !expanded && classes.truncatedDescription, !title && PostTypeIndicatorStyle(type))}
            >
                {`${!title ? POST_TYPE_INDICATOR_PLACEHOLDER : ""}${post.description}`}
            </div>
            <Fade in={!expanded && canExpand} mountOnEnter unmountOnExit timeout={{ enter: 1000 }}>
                <div className={classes.toggleExpandText}>Show More</div>
            </Fade>
            <Collapse in={expanded} mountOnEnter unmountOnExit>
                <div>
                    {additionalInformation ? (
                        <>
                            <Typography variant="caption" className={classes.additionalInfoTitle}>
                                Additional Information
                            </Typography>
                            <div className={clsx(classes.multilineText, classes.additionalInfo)}>{additionalInformation}</div>
                        </>
                    ) : null}
                    <Fade in={true} mountOnEnter unmountOnExit timeout={{ enter: 1000 }}>
                        <div className={classes.toggleExpandText}>Show Less</div>
                    </Fade>
                </div>
            </Collapse>
        </Typography>
    );
}

export default withStyles(styles)(PostContent);
