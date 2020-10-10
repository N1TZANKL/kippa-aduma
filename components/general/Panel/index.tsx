import React from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import { Children, MuiStyles } from "interfaces";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import clsx from "clsx";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Button, { ButtonProps } from "@material-ui/core/Button";

const styles = (theme: Theme) =>
    createStyles({
        title: {
            fontWeight: "bold",
            fontFamily: "monospace",
        },
        subtitle: {
            width: "fit-content",
            borderBottom: "2px solid rgba(255,255,255,0.6)",
            margin: "5px 0",
        },
        panel: {
            borderRadius: 2,
            background: lighten(theme.constants.appBackground, 0.05),
            position: "relative",
        },
        highlightBackground: {
            backgroundColor: theme.constants.appBackgroundHighlight,
            boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        },
        fullHeight: { height: "100%" },
        bottomBar: {
            display: "flex",
            alignItems: "center",
            position: "relative",
        },
        button: {
            fontSize: 16,
            fontFamily: "monospace",
            padding: "1px 12px",
            display: "flex",
            alignItems: "center",
            height: 30,
            // in case there's also an icon:
            "& > * > svg": {
                marginRight: 5,
                fontSize: 20,
            },
        },
    });

type PanelProps = MuiStyles & PaperProps & { fullHeight?: boolean; className?: string };
export const Panel = withStyles(styles)((props: PanelProps) => {
    const { classes, fullHeight, className, ...otherProps } = props;

    return <Paper className={clsx(classes.panel, className, fullHeight && classes.fullHeight)} {...otherProps} />;
});

export default Panel;

type PanelTitleProps = MuiStyles & TypographyProps & { withBackground?: boolean };
export const PanelTitle = withStyles(styles)((props: PanelTitleProps) => {
    const { classes, withBackground, className, ...otherProps } = props;

    return (
        <Typography
            component="div"
            variant="h5"
            align="center"
            className={clsx(classes.title, className, withBackground && classes.highlightBackground)}
            {...otherProps}
        />
    );
});

type PanelSubtitleProps = MuiStyles & TypographyProps;
export const PanelSubtitle = withStyles(styles)(({ classes, ...otherProps }: PanelSubtitleProps) => (
    <Typography className={clsx(classes.title, classes.subtitle)} variant="h6" {...otherProps} />
));

type PanelBottomBarProps = MuiStyles & { children: Children; className?: string };
export const PanelBottomBar = withStyles(styles)(({ classes, className, children }: PanelBottomBarProps) => (
    <div className={clsx(classes.bottomBar, classes.highlightBackground, className)}>{children}</div>
));

type PanelButtonProps = MuiStyles & ButtonProps;
export const PanelButton = withStyles(styles)(({ classes, className, ...otherProps }: PanelButtonProps) => (
    <Button className={clsx(classes.button, className)} variant="contained" {...otherProps} />
));
