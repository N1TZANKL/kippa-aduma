import React from "react";
import PageWrapper from "common/components/PageWrapper";
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
                    <PageWrapper>
                        {routes.map((route) => (
                            <Route path={route.path} exact key={route.title}>
                                {route.component}
                            </Route>
                        ))}
                        <Redirect to="/" />
                    </PageWrapper>
                </Switch>
            </Router>
        </div>
    );
}

export default withStyles(styles)(App);
