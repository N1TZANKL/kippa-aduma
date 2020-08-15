import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "./app-bar";
import Paper from "@material-ui/core/Paper";
import Sidebar from "./side-bar";

const styles = (theme) => ({
    pageRoot: {
        height: "100%",
    },
    wrapper: {
        marginTop: 65,
        height: "calc(100% - 65px)",
        display: "flex",
        overflowY: "auto",
        position: "relative",
    },
    childrenWrapper: {
        borderRadius: 0,
        padding: 20,
        width: "calc(100% - 70px - 40px)",
    },
});

function PageWrapper({ classes, children }) {
    return (
        <div className={classes.pageRoot}>
            <AppBar />
            <div className={classes.wrapper}>
                <Sidebar />
                <Paper className={classes.childrenWrapper} children={children} />
            </div>
        </div>
    );
}

PageWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(PageWrapper);
