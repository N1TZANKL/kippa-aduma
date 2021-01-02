import React from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import clsx from "clsx";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Box, { BoxProps } from "@material-ui/core/Box";
import SvgIcon from "@material-ui/core/SvgIcon";

import { MuiStyles } from "src/utils/interfaces";
import { spaceChildren } from "src/utils/helpers/css";

const styles = (theme: Theme) =>
    createStyles({
        title: {
            fontWeight: "bold",
            fontFamily: "Inconsolata",
            letterSpacing: 1.15,
        },
        subtitle: {
            width: "fit-content",
            margin: "5px 0",
            fontSize: 16,
        },
        subtitleUnderline: {
            borderBottom: "2px solid rgba(255,255,255,0.6)",
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
            borderRadius: 4,
            backgroundColor: "rgba(255,255,255,0.07)",
            // background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 10px, transparent 10px, transparent 20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        numberStat: {
            padding: "15px 25px",
        },
        statTitle: {
            fontFamily: "Inconsolata",
            letterSpacing: 1.15,
            fontWeight: "bold",
            textAlign: "center",
        },
        statContent: {
            fontFamily: "Inconsolata",
            letterSpacing: 1.15,
            wordBreak: "break-word",
        },
        comingSoon: {
            position: "relative",
            padding: "0 8px",
            userSelect: "none",
            width: "fit-content",
            height: "fit-content",
            alignSelf: "center",
        },
        comingSoonBackground: {
            backgroundColor: "yellow",
            opacity: 0.2,
            transform: "rotate(-2deg)",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
        comingSoonText: {
            backgroundColor: "rgba(0,0,0,0.1)",
            textShadow: "1px 1px 1px black",
        },
        iconStat: {
            height: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            padding: 0,
            "& > *": { padding: 10 },
        },
        statIcon: {
            fontSize: 52,
        },
        statIconWrapper: {
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.05)",
            marginRight: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 150,
            minWidth: 150,
            ...spaceChildren("vertically", 10),
        },
        iconStatContent: {
            minWidth: 175,
            display: "flex",
            flexDirection: "column",
        },
    });

type PanelProps = MuiStyles & PaperProps & { fullHeight?: boolean; className?: string };
const Panel = withStyles(styles)((props: PanelProps) => {
    const { classes, fullHeight, className, ...otherProps } = props;

    return <Paper className={clsx(classes.panel, className, fullHeight && classes.fullHeight)} {...otherProps} />;
});

export default Panel;

type PanelTitleProps = MuiStyles & BoxProps & { withBackground?: boolean; className?: string; children: React.ReactNode };
export const PanelTitle = withStyles(styles)((props: PanelTitleProps) => {
    const { classes, withBackground, className, children, ...boxProps } = props;

    return (
        <Box {...boxProps} clone>
            <Typography
                component="div"
                variant="h5"
                align="center"
                className={clsx(classes.title, className, withBackground && classes.highlightBackground)}
            >
                {children}
            </Typography>
        </Box>
    );
});

type PanelSubtitleProps = MuiStyles & TypographyProps & { noUnderline?: boolean; className?: string };
export const PanelSubtitle = withStyles(styles)(({ classes, noUnderline, className, ...otherProps }: PanelSubtitleProps) => (
    <Typography
        className={clsx(classes.title, classes.subtitle, !noUnderline && classes.subtitleUnderline, className)}
        variant="h5"
        {...otherProps}
    />
));

type ComingSoonProps = MuiStyles & { className?: string };
export const ComingSoon = withStyles(styles)(({ className, classes }: ComingSoonProps) => (
    <div className={clsx(classes.comingSoon, className)}>
        <div className={classes.comingSoonBackground} />
        <PanelSubtitle noUnderline className={classes.comingSoonText}>
            Coming Soon!
        </PanelSubtitle>
    </div>
));

type PanelBottomBarProps = MuiStyles & { children: React.ReactChild; className?: string };
export const PanelBottomBar = withStyles(styles)(({ classes, className, children }: PanelBottomBarProps) => (
    <div className={clsx(classes.bottomBar, classes.highlightBackground, className)}>{children}</div>
));

export type PanelButtonProps = MuiStyles & ButtonProps;
export const PanelButton = withStyles(styles)(({ classes, className, ...otherProps }: PanelButtonProps) => (
    <Button className={clsx(classes.button, className)} variant="contained" {...otherProps} />
));

type PanelTextStatProps = MuiStyles & { title: string; children: React.ReactChild };
export const PanelTextStat = withStyles(styles)(({ classes, title, children }: PanelTextStatProps) => (
    <div className={classes.stat}>
        <Typography variant="h6" className={classes.statTitle}>
            {title}
        </Typography>
        <Typography variant="body1" component="div" color="textSecondary" className={classes.statContent}>
            {children}
        </Typography>
    </div>
));

type PanelNumberStatProps = MuiStyles & { title: string; number: number };
export const PanelNumberStat = withStyles(styles)(({ classes, title, number }: PanelNumberStatProps) => (
    <div className={clsx(classes.stat, classes.numberStat)}>
        <Typography variant="h3" className={classes.statTitle}>
            {number}
        </Typography>
        <Typography variant="body1" component="div" color="textSecondary" align="center" className={classes.statContent}>
            {title}
        </Typography>
    </div>
));

type PanelIconStatProps = MuiStyles & { title: string; icon: string; children: React.ReactNode; className?: string };
export const PanelIconStat = withStyles(styles)(({ classes, title, icon, children, className }: PanelIconStatProps) => (
    <div className={clsx(classes.stat, classes.iconStat, className)}>
        <div className={classes.statIconWrapper}>
            <SvgIcon className={classes.statIcon}>
                <path d={icon} />
            </SvgIcon>
            <PanelSubtitle align="center" noUnderline>
                {title}
            </PanelSubtitle>
        </div>
        <Typography variant="body1" component="div" color="textSecondary" className={clsx(classes.statContent, classes.iconStatContent)}>
            {children}
        </Typography>
    </div>
));
