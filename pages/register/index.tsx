import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles } from "interfaces";
import ExteriorPageLayout, { Form, FormSubtitle } from "components/ExteriorPageLayout";
import TextField from "components/TextField";
import SensitiveTextField from "components/SensitiveTextField";

const styles = (theme: Theme) => createStyles({});

function Register({ classes /* csrfToken */ }: MuiStyles) {
    return (
        <ExteriorPageLayout>
            <Form
                title={"register"}
                action=""
                submitMessage="Sign up!"
                subtitle={<FormSubtitle actionName="login" href="/login" prompt="Already have a user?" />}
            >
                {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
                <TextField label="Username" />
                <TextField label="Nickname" />
                <SensitiveTextField label="Password" />
                <SensitiveTextField label="Re-type Password" />
            </Form>
        </ExteriorPageLayout>
    );
}

/* Register.getInitialProps = async (context) => ({csrfToken: await csrfToken(context)}); */

export default withStyles(styles)(Register);
