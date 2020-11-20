import React from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import clsx from "clsx";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Button, { ButtonProps } from "@material-ui/core/Button";

import { Children, MuiStyles } from "interfaces";

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
        stat: {
            padding: 10,
            backgroundColor: "rgba(255,255,255,0.07)",
            // background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 10px, transparent 10px, transparent 20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        statTitle: {
            fontFamily: "monospace",
            fontWeight: "bold",
        },
        statContent: {
            fontFamily: "monospace",
        },
    });

type PanelProps = MuiStyles & PaperProps & { fullHeight?: boolean; className?: string };
const Panel = withStyles(styles)((props: PanelProps) => {
    const { classes, fullHeight, className, ...otherProps } = props;

    return <Paper className={clsx(classes.panel, className, fullHeight && classes.fullHeight)} {...otherProps} />;
});

export default Panel;

type PanelTitleProps = MuiStyles & { withBackground?: boolean; className?: string; children: Children };
export const PanelTitle = withStyles(styles)((props: PanelTitleProps) => {
    const { classes, withBackground, className, children } = props;

    return (
        <Typography
            component="div"
            variant="h5"
            align="center"
            className={clsx(classes.title, className, withBackground && classes.highlightBackground)}
        >
            {children}
        </Typography>
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

export type PanelButtonProps = MuiStyles & ButtonProps;
export const PanelButton = withStyles(styles)(({ classes, className, ...otherProps }: PanelButtonProps) => (
    <Button className={clsx(classes.button, className)} variant="contained" {...otherProps} />
));

type PanelStatProps = MuiStyles & { title: string; children: Children };
export const PanelStat = withStyles(styles)(({ classes, title, children }: PanelStatProps) => (
    <Paper className={classes.stat} variant="outlined">
        <Typography variant="h5" className={classes.statTitle}>
            {title}
        </Typography>
        <Typography variant="h6" component="div" color="textSecondary" className={classes.statContent}>
            {children}
        </Typography>
    </Paper>
));
