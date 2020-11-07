import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

import ExteriorPageLayout, { Form, FormSubtitle } from "components/layouts/ExteriorLayout";
import TextField from "components/general/TextField";
import SensitiveTextField from "components/general/SensitiveTextField";
import { Post } from "utils/helpers/api";

export default function Register(): JSX.Element {
    const router = useRouter();

    const [formError, setFormError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const usernameInput = useRef<HTMLInputElement>(null);
    const nicknameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const retypePasswordInput = useRef<HTMLInputElement>(null);

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
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

        setPasswordError("");
        setFormError("");
        setIsLoading(true);

        Post("user/register", { username, nickname, password })
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
