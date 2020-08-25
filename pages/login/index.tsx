import React, { useCallback, useRef, useState } from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles } from "interfaces";
import { useRouter } from "next/router";
import ExteriorPageLayout, { Form, FormSubtitle } from "components/ExteriorPageLayout";
import TextField from "components/TextField";
import SensitiveTextField from "components/SensitiveTextField";

const styles = (theme: Theme) => createStyles({});

function Login({ classes }: MuiStyles) {
    const router = useRouter();    
    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [formError, setFormError] = useState<string | undefined>();

    const onSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        const username = usernameInput.current!.value;
        const password = passwordInput.current!.value;

        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
    
            if (response.ok) return router.push("/");

            setFormError(await response.text());
        }
        catch {
            setFormError("an unknown error occurd");
        }
    }, [usernameInput, passwordInput]);

    return (
        <ExteriorPageLayout>
            <Form
                title="login"
                submitMessage="Enter the dark side!"
                error={formError}
                onSubmit={onSubmit}
                subtitle={<FormSubtitle actionName="register" href="/register" prompt="Don't have a user?" />}
            >
                <TextField label="Username" inputRef={usernameInput} required />
                <SensitiveTextField label="Password" inputRef={passwordInput} required />
            </Form>
        </ExteriorPageLayout>
    );
}

export default withStyles(styles)(Login);
