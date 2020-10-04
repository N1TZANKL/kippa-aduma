import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";

import ExteriorPageLayout, { Form, FormSubtitle } from "components/layouts/ExteriorLayout";
import TextField from "components/general/TextField";
import SensitiveTextField from "components/general/SensitiveTextField";

function Login() {
    const router = useRouter();
    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [formError, setFormError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            const username = usernameInput.current!.value;
            const password = passwordInput.current!.value;

            try {
                setIsLoading(true);
                setFormError(undefined);

                const response = await fetch("/api/user/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) return await router.push("/");
                return setFormError(await response.text());
            } catch {
                return setFormError("an unknown error occured");
            } finally {
                setIsLoading(false);
            }
        },
        [router, usernameInput, passwordInput],
    );

    return (
        <ExteriorPageLayout>
            <Form
                title="login"
                submitMessage="Enter the dark side!"
                error={formError}
                onSubmit={onSubmit}
                subtitle={<FormSubtitle actionName="register" href="/register" prompt="Don't have a user?" />}
                loading={isLoading}
            >
                <TextField label="Username" inputRef={usernameInput} required />
                <SensitiveTextField label="Password" inputRef={passwordInput} required />
            </Form>
        </ExteriorPageLayout>
    );
}

export default Login;
