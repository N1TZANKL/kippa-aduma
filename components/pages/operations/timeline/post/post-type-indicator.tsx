import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CSSProperties } from "@material-ui/styles";
import * as muiColors from "@material-ui/core/colors";

import { textEllipsis } from "utils/helpers/css";
import { OperationPostTypes } from "db/models/post";
import { StringObject } from "interfaces";

export const PostTypeToColor: StringObject = {
    [OperationPostTypes.SUCCESS]: muiColors.green.A400,
    [OperationPostTypes.RECON]: muiColors.cyan.A400,
    [OperationPostTypes.BURN]: muiColors.red.A400,
    [OperationPostTypes.ACTION]: muiColors.amber.A400,
    [OperationPostTypes.UPDATE]: muiColors.grey[400],
};

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

type UseStylesProps = { postType: OperationPostTypes };

const useStyles = makeStyles({
    indicatorChip: {
        ...POST_TYPE_INDICATOR_CHIP_STYLE,
        backgroundColor: (props: UseStylesProps) => PostTypeToColor[props.postType],
    },
    descriptionIndicatorChip: (props: UseStylesProps) => ({
        "&::before": {
            content: `"${props.postType}"`,
            ...POST_TYPE_INDICATOR_CHIP_STYLE,
            backgroundColor: PostTypeToColor[props.postType],
            position: "absolute",
            ...textEllipsis,
        },
    }),
});

export const POST_TYPE_INDICATOR_PLACEHOLDER = "                 ";

type PostTypeIndicatorProps = { type: OperationPostTypes };

export default function PostTypeIndicator({ type }: PostTypeIndicatorProps): JSX.Element {
    const classes = useStyles({ postType: type });

    return <div className={classes.indicatorChip}>{type}</div>;
}

export const PostTypeIndicatorStyle = (postType: OperationPostTypes): string => {
    const classes = useStyles({ postType });
    return classes.descriptionIndicatorChip;
};
