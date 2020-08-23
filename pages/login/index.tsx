import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles } from "interfaces";
import ExteriorPageLayout, { Form } from "components/ExteriorPageLayout";
import TextField from "components/TextField";
import SensitiveTextField from "components/SensitiveTextField";

const styles = (theme: Theme) => createStyles({});

function Login({ classes /* csrfToken */ }: MuiStyles) {
    return (
        <ExteriorPageLayout>
            <Form title={"login"} action="" submitMessage="Enter the dark side!">
                {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
                <TextField label="Username" />
                <SensitiveTextField label="Password" />
            </Form>
        </ExteriorPageLayout>
    );
}

/* Login.getInitialProps = async (context) => ({csrfToken: await csrfToken(context)}); */

export default withStyles(styles)(Login);
