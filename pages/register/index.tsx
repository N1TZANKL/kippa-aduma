import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";

import ExteriorPageLayout, { Form, FormSubtitle } from "components/layouts/ExteriorLayout";
import TextField from "components/general/TextField";
import SensitiveTextField from "components/general/SensitiveTextField";

export default function Register(): JSX.Element {
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

            const username = usernameInput.current?.value;
            const nickname = nicknameInput.current?.value;
            const password = passwordInput.current?.value;
            const retypePassword = retypePasswordInput.current?.value;

            if (!(username || nickname || password || retypePassword)) return;

            if (retypePassword !== password) {
                setPasswordError("passwords must match");
                return;
            }

            setPasswordError(undefined);
            setIsLoading(true);
            setFormError(undefined);

            try {
                const response = await fetch("/api/user/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, nickname, password }),
                });

                if (response.ok) await router.push("/");
                else setFormError(await response.text());
            } catch {
                setFormError("an unknown error occured");
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
