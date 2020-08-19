import React from "react";
import PageLayout from "./page-layout";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import routes from "./config/routes";

const styles = (theme: Theme) => ({
    app: {
        height: "100%",
    },
});
function App(props: WithStyles<typeof styles>) {
    const { classes } = props;

    return (
        <div className={classes.app}>
            <Router>
                <Switch>
                    <PageLayout>
                        {routes.map((route) => (
                            <Route path={route.path} exact key={route.title}>
                                {route.component}
                            </Route>
                        ))}
                        <Redirect to="/" />
                    </PageLayout>
                </Switch>
            </Router>
        </div>
    );
}

export default withStyles(styles)(App);
