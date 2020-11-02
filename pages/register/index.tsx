import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";

import ExteriorPageLayout, { Form, FormSubtitle } from "components/layouts/ExteriorLayout";
import TextField from "components/general/TextField";
import SensitiveTextField from "components/general/SensitiveTextField";

function Register() {
    const router = useRouter();

    const [formError, setFormError] = useState<string | undefined>();
    const [passwordError, setPasswordError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const usernameInput = useRef<HTMLInputElement>(null);
    const nicknameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const retypePasswordInput = useRef<HTMLInputElement>(null);

    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const username = usernameInput.current!.value;
            const nickname = nicknameInput.current!.value;
            const password = passwordInput.current!.value;
            const retypePassword = retypePasswordInput.current!.value;

            if (retypePassword !== password) return setPasswordError("passwords must match");
            setPasswordError(undefined);

            try {
                setIsLoading(true);
                setFormError(undefined);

                const response = await fetch("/api/user/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, nickname, password }),
                });

                if (response.ok) return await router.push("/");
                return setFormError(await response.text());
            } catch {
                return setFormError("an unknown error occured");
            } finally {
                setIsLoading(false);
            }
        },
        [usernameInput, nicknameInput, passwordInput, retypePasswordInput, router]
    );

    return (
        <ExteriorPageLayout>
            <Form
                title="register"
                submitMessage="Sign up!"
                onSubmit={onSubmit}
                error={formError}
                loading={isLoading}
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

export default Register;
