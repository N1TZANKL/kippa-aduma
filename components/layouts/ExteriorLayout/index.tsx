import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { lightBlue } from "@material-ui/core/colors";

import { Children, PageLayoutProps, MuiStyles } from "interfaces";
import { SubmitButton, FormError } from "components/forms";


const styles = (theme: Theme) => createStyles({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.constants.appBackground,
        minHeight: 850,
        minWidth: 600,
    },
    banner: {
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: "35%",
        fontFamily: "monospace",
        fontSize: 72,
        display: "flex",
        paddingTop: "10vh",
        justifyContent: "center",
        textShadow: "0 2px 2px black",
        borderRadius: 0,
        padding: 30,
        minHeight: 260,
    },
    formWrapper: {
        display: "flex",
        justifyContent: "center",
    },
    formBase: {
        position: "absolute",
        top: "26%",
        height: "60%",
        backgroundColor: theme.constants.appBackgroundHighlight,
        minWidth: 450,
        minHeight: 600,
        width: "36%",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
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
        margin: "25px 0",
        width: "fit-content",
        minWidth: 250,
        fontWeight: 800,
        fontSize: 18,
        letterSpacing: 1,
        padding: "5px 35px",
    },
    subtitle: {
        fontStyle: "italic",
        display: "flex",
    },
    subtitleLink: {
        fontWeight: 500,
        color: lightBlue.A200,
        margin: "0 5px",
        cursor: "pointer",
        textDecoration: "underline",
    },
});

type SubtitleProps = MuiStyles & { actionName: string; prompt: string; href: string };

export const FormSubtitle = withStyles(styles)(({
    classes, prompt, actionName, href,
}: SubtitleProps) => (
        <Typography variant="subtitle1" className={classes.subtitle}>
            {prompt} Click
            <a className={classes.subtitleLink} href={href}> here </a>
            to {actionName}!
        </Typography>
    ));

type FormProps = MuiStyles & React.FormHTMLAttributes<Element> & {
    title: string;
    subtitle?: Children;
    submitMessage?: string;
    error?: string;
    loading: boolean;
    children: Children[];
};

export const Form = withStyles(styles)(({
    classes, title, children, subtitle, submitMessage, error, loading, ...formElementProps
}: FormProps) => (
        <>
            <Typography variant="h3" className={classes.formTitle}>{title}</Typography>
            {subtitle}
            <Divider className={classes.formTitleDivider} />
            <form {...formElementProps} className={classes.form}>
                <div className={classes.formChildren}>{children}</div>
                <SubmitButton className={classes.submitButton} isSubmitting={loading}>
                    {submitMessage}
                </SubmitButton>
            </form>
            {error && <FormError>{error}</FormError>}
        </>
    ));

function ExteriorPageLayout({ classes, children }: PageLayoutProps) {
    return (
        <div className={classes.root}>
            <Paper className={classes.banner}>
                <span>Kippa Aduma</span>
            </Paper>
            <div className={classes.formWrapper}>
                <Paper className={classes.formBase} elevation={8}>{children}</Paper>
            </div>
        </div>
    );
}

export default withStyles(styles)(ExteriorPageLayout);
