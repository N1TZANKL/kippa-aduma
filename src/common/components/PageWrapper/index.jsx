import React from "react";
import PropTypes from "prop-types";
import { lighten, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import routes from "app/config/routes";
import { Link, withRouter } from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";

const styles = (theme) => ({
    pageRoot: {
        height: "100%",
    },
    appBar: {
        height: 65,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0 15px",
        backgroundColor: theme.palette.primary.dark,
        zIndex: 2,
    },
    title: {
        fontFamily: "monospace",
        fontWeight: "bold",
        letterSpacing: 1.5,
        textShadow: "0 2px 2px black",
    },
    currentPath: {
        fontFamily: "monospace",
        fontWeight: "bold",
        letterSpacing: 1.5,
        textShadow: "0 2px 2px black",
        marginLeft: 15,
        marginTop: 2,
    },
    logo: {
        cursor: "pointer",
        marginRight: 15,
        width: 45,
        height: 45,
        borderRadius: "50%",
        backgroundColor: "white",
        boxShadow: "0 2px 2px black",
    },
    wrapper: {
        marginTop: 65,
        height: "calc(100% - 65px)",
        display: "flex",
        overflowY: "auto",
    },
    sidebar: {
        borderRadius: 0,
        height: "100%",
        width: 70,
        backgroundColor: theme.palette.constants.appBackgroundDark,
        borderRight: `1px solid ${theme.palette.constants.appBackgroundHighlight}`,
        zIndex: 1,
        boxShadow: `0px 0px 7px 1px ${theme.palette.constants.appBackgroundHighlight}`,
        "& > *:not(:last-child)": {
            borderBottom: `1px solid ${theme.palette.constants.appBackgroundHighlight}`,
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    sidebarBox: {
        width: 70,
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "15px 0",
        "&:hover": {
            backgroundColor: lighten(theme.palette.constants.appBackgroundDark, 0.1),
        },
    },
    sidebarIcon: {
        fontSize: 28,
    },
    childrenWrapper: {
        borderRadius: 0,
        padding: 20,
        width: "calc(100% - 70px - 40px)",
        backgroundColor: theme.palette.constants.appBackground,
    },
});

function PageWrapper(props) {
    const { classes, history } = props;

    const currentPath = history.location.pathname;

    return (
        <div className={classes.pageRoot}>
            <AppBar color="primary" className={classes.appBar}>
                <img alt="kippa-aduma-logo" className={classes.logo} src="/favicon.ico" />
                <Typography variant="h4" children="Kippa Aduma" className={classes.title} />
                {currentPath !== "/" && <Typography variant="h5" children={currentPath} className={classes.currentPath} />}
            </AppBar>
            <div className={classes.wrapper}>
                <Card className={classes.sidebar}>
                    {routes.map((route) => {
                        return (
                            <Link to={route.path} key={route.path}>
                                <div className={classes.sidebarBox} title={route.title}>
                                    <SvgIcon className={classes.sidebarIcon} style={route.iconStyle}>
                                        <path d={route.icon} />
                                    </SvgIcon>
                                </div>
                            </Link>
                        );
                    })}
                </Card>
                <Card className={classes.childrenWrapper} children={props.children} />
            </div>
        </div>
    );
}

PageWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(withRouter(PageWrapper));
