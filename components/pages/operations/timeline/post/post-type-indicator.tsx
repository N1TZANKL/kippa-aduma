import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CSSProperties } from "@material-ui/styles";

import { before, textEllipsis } from "utils/helpers/css";
import { OperationPostTypes } from "db/models/post";

import { PostTypeToColor } from "./post";

const POST_TYPE_INDICATOR_CHIP_STYLE: CSSProperties = {
    borderRadius: 3,
    padding: "2px 8px",
    color: "white",
    textTransform: "uppercase",
    marginRight: 8,
    fontFamily: "monospace",
    textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
    marginBottom: 3,
    display: "flex",
    justifyContent: "center",
    width: 62,
    maxWidth: 62,
    fontSize: 11,
};

const useStyles = makeStyles({
    indicatorChip: {
        ...POST_TYPE_INDICATOR_CHIP_STYLE,
        backgroundColor: (props: any) => PostTypeToColor[props.postType],
    },
    descriptionIndicatorChip: (props: any) =>
        before(props.postType, {
            ...POST_TYPE_INDICATOR_CHIP_STYLE,
            backgroundColor: PostTypeToColor[props.postType],
            position: "absolute",
            ...textEllipsis,
        }) as any, // TS was bitching :(
});

export const POST_TYPE_INDICATOR_PLACEHOLDER = "                 ";

type PostTypeIndicatorProps = { type: OperationPostTypes };

export default function PostTypeIndicator(props: PostTypeIndicatorProps) {
    const { type } = props;
    const classes = useStyles({ postType: type });

    return <div className={classes.indicatorChip}>{type}</div>;
}

export const PostTypeIndicatorStyle = (postType: OperationPostTypes) => {
    const classes = useStyles({ postType });
    return classes.descriptionIndicatorChip;
};
