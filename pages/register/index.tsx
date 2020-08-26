import React, { useCallback, useRef, useState } from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles } from "interfaces";
import ExteriorPageLayout, { Form, FormSubtitle } from "components/ExteriorPageLayout";
import TextField from "components/TextField";
import SensitiveTextField from "components/SensitiveTextField";
import { useRouter } from "next/router";

const styles = (theme: Theme) => createStyles({});

function Register({ classes }: MuiStyles) {
    const router = useRouter();

    const [formError, setFormError] = useState<string | undefined>();
    const [passwordError, setPasswordError] = useState<string | undefined>();

    const usernameInput = useRef<HTMLInputElement>(null);
    const nicknameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const retypePasswordInput = useRef<HTMLInputElement>(null);

    const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const username = usernameInput.current!.value;
        const nickname = nicknameInput.current!.value;
        const password = passwordInput.current!.value;
        const retypePassword = retypePasswordInput.current!.value;

        if (retypePassword !== password) return setPasswordError("passwords must match");
        else setPasswordError(undefined);

        try {
            const response = await fetch("/api/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, nickname, password })
            });
    
            if (response.ok) return router.push("/");
    
            setFormError(await response.text());
        }
        catch {
            setFormError("an unknown error occured");
        }
    }, [usernameInput, nicknameInput, passwordInput, retypePasswordInput, router]);

    return (
        <ExteriorPageLayout>
            <Form
                title="register"
                submitMessage="Sign up!"
                onSubmit={onSubmit}
                error={formError}
                subtitle={<FormSubtitle actionName="login" href="/login" prompt="Already have a user?" />}
            >
                <TextField label="Username" inputRef={usernameInput} required />
                <TextField label="Nickname" inputRef={nicknameInput} required />
                <SensitiveTextField label="Password" inputRef={passwordInput} required />
                <SensitiveTextField label="Re-type Password" inputRef={retypePasswordInput} required errorMessage={passwordError} />
            </Form>
        </ExteriorPageLayout>
    );
}

export default withStyles(styles)(Register);
