import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import { red, green } from "@material-ui/core/colors";

const useStyles = makeStyles({
    root: {
        color: (props: { color: string }) => props.color,
        fontWeight: 500,
        fontFamily: "Inconsolata",
        letterSpacing: 1.15,
    },
});

type FormTextProps = Omit<TypographyProps, "color"> & { color: string };

function FormText({ color, ...props }: FormTextProps) {
    const classes = useStyles({ color });

    return <Typography variant="h6" className={classes.root} align="center" {...props} />;
}

export const FormError = (props: Omit<TypographyProps, "color">) => <FormText {...props} color={red[400]} />;
export const FormSuccess = (props: Omit<TypographyProps, "color">) => <FormText {...props} color={green.A400} />;
