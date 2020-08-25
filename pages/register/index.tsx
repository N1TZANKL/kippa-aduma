import React, { useCallback, useRef } from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles } from "interfaces";
import ExteriorPageLayout, { Form, FormSubtitle } from "components/ExteriorPageLayout";
import TextField from "components/TextField";
import SensitiveTextField from "components/SensitiveTextField";
import { useRouter } from "next/router";

const styles = (theme: Theme) => createStyles({});

function Register({ classes }: MuiStyles) {
    const router = useRouter();

    const usernameInput = useRef<HTMLInputElement>(null);
    const nicknameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const username = usernameInput.current!.value;
        const nickname = nicknameInput.current!.value;
        const password = passwordInput.current!.value;

        const response = await fetch("/api/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, nickname, password })
        });

        if (response.ok) router.push("/");
    }, [usernameInput, nicknameInput, passwordInput, router]);

    return (
        <ExteriorPageLayout>
            <Form
                title="register"
                submitMessage="Sign up!"
                onSubmit={onSubmit}
                subtitle={<FormSubtitle actionName="login" href="/login" prompt="Already have a user?" />}
            >
                <TextField label="Username" inputRef={usernameInput} />
                <TextField label="Nickname" inputRef={nicknameInput} />
                <SensitiveTextField label="Password" inputRef={passwordInput} />
                <SensitiveTextField label="Re-type Password" />
            </Form>
        </ExteriorPageLayout>
    );
}

export default withStyles(styles)(Register);
