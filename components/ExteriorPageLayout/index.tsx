import React from "react";
import { PageLayoutProps, MuiStyles } from "interfaces";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Children } from "interfaces";
import Button from "@material-ui/core/Button";
import { lightBlue } from "@material-ui/core/colors";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: "100%",
            backgroundColor: theme.constants.appBackground,
            overflow: "auto",
            minHeight: 750,
            minWidth: 625,
            overflowY: "auto",
        },
        banner: {
            backgroundColor: theme.palette.primary.main,
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            width: "100%",
            height: "35%",
            fontFamily: "monospace",
            fontSize: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textShadow: "0 2px 2px black",
            borderRadius: 0,
            padding: 30,
            minHeight: 260,
        },
        formBase: {
            position: "absolute",
            top: "30%",
            height: "60%",
            backgroundColor: theme.constants.appBackgroundHighlight,
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            minWidth: 350,
            minHeight: 450,
            width: "35%",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        /* logo: {
            marginRight: 45,
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 2px 2px black",
        }, */
        formTitle: {
            fontFamily: "monospace",
            textTransform: "uppercase",
            textShadow: "0 2px 2px black",
        },
        formTitleDivider: {
            margin: "10px 0 35px",
            width: "100%",
        },
        form: {
            width: "100%",
            height: "100%",
            padding: "0 25px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
        },
        formChildren: {
            width: "100%",
            "& > div": {
                margin: "10px 0",
            },
        },
        submitButton: {
            fontFamily: "monospace",
            margin: "25px 0",
            width: "fit-content",
            minWidth: 250,
            fontWeight: 800,
            fontSize: 18,
            color: "white",
            letterSpacing: 1,
            padding: "5px 35px",
        },
        subtitle: {
            fontStyle: "italic",
            display: "flex",
        },
        subtitleLink: {
            fontWeight: 500,
            color: lightBlue["A200"],
            margin: "0 5px",
            cursor: "pointer",
            textDecoration: "underline",
        },
    });

type SubtitleProps = MuiStyles & { actionName: string; prompt: string; href: string };

export const FormSubtitle = withStyles(styles)(({ classes, prompt, actionName, href }: SubtitleProps) => (
    <Typography variant="subtitle1" className={classes.subtitle}>
        {prompt} Click <a className={classes.subtitleLink} href={href}>here</a> to {actionName}!
    </Typography>
));

type FormProps = MuiStyles & { title: string; children: Children[]; subtitle?: Children; submitMessage?: string } & React.FormHTMLAttributes<any>;

export const Form = withStyles(styles)(({ classes, title, children, subtitle, submitMessage, ...formElementProps }: FormProps) => (
    <>
        <Typography variant="h3" className={classes.formTitle} children={title} />
        {subtitle}
        <Divider className={classes.formTitleDivider} />
        <form {...formElementProps} className={classes.form}>
            <div className={classes.formChildren} children={children} />
            <Button type="submit" children={submitMessage || "submit!"} color="secondary" className={classes.submitButton} variant="contained" />
        </form>
    </>
));

function ExteriorPageLayout({ classes, children }: PageLayoutProps) {
    return (
        <div className={classes.root}>
            <Paper className={classes.banner}>
                {/* <img className={classes.logo} src="/favicon.ico" alt="App-Logo" /> */}
                <span>Kippa Aduma</span>
            </Paper>
            <Paper className={classes.formBase} elevation={8} children={children} />
        </div>
    );
}

export default withStyles(styles)(ExteriorPageLayout);
