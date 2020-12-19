import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as muiColors from "@material-ui/core/colors";

import { OperationPostTypes } from "server/db/post/model";

export const PostTypeToColor: Record<OperationPostTypes, string> = {
    [OperationPostTypes.SUCCESS]: muiColors.green.A400,
    [OperationPostTypes.RECON]: muiColors.cyan.A400,
    [OperationPostTypes.BURN]: muiColors.red.A400,
    [OperationPostTypes.ACTION]: muiColors.amber.A400,
    [OperationPostTypes.UPDATE]: muiColors.grey[400],
};

type UseStylesProps = { postType: OperationPostTypes };

const useStyles = makeStyles({
    indicatorChip: {
        borderRadius: 3,
        padding: "1px 8px",
        color: "white",
        textTransform: "uppercase",
        fontFamily: "Inconsolata",
        letterSpacing: 1.15,
        textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
        marginBottom: 3,
        display: "flex",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 600,
        marginLeft: 10,
        fontStyle: "normal",
        backgroundColor: (props: UseStylesProps) => PostTypeToColor[props.postType],
    },
});

type PostTypeIndicatorProps = { type: OperationPostTypes };

export default function PostTypeIndicator({ type }: PostTypeIndicatorProps): JSX.Element {
    const classes = useStyles({ postType: type });

    return <div className={classes.indicatorChip}>{type}</div>;
}
