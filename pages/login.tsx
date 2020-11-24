import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

import ExteriorPageLayout, { Form, FormSubtitle } from "src/components/layouts/ExteriorLayout";
import TextField from "src/components/general/TextField";
import SensitiveTextField from "src/components/general/SensitiveTextField";
import { Post } from "src/utils/helpers/api";

function Login(): JSX.Element {
    const router = useRouter();
    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [formError, setFormError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const username = usernameInput.current?.value;
        const password = passwordInput.current?.value;

        if (!username || !password) return;

        setIsLoading(true);
        setFormError("");

        Post("user/login", { username, password })
            .then(async (res) => {
                if (res.ok) await router.push("/");
                else setFormError(await res.text());
            })
            .catch(() => setFormError("an unknown error occured"))
            .finally(() => setIsLoading(false));
    }

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
