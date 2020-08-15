import React from "react";
import PageLayout from "./page-layout";
import { withStyles } from "@material-ui/core/styles";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "./config/routes";
import { BrowserRouter as Router } from "react-router-dom";

const styles = (theme) => ({
    app: {
        height: "100%",
    },
});
function App({ classes }) {
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
