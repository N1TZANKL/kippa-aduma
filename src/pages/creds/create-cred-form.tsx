import React from "react";
import * as Yup from "yup";
import { FormikProps } from "formik";

import { ArrayToSelectionList } from "src/components/general/Select";
import { FormBase, TextField, Select } from "src/components/forms";
import { CredentialTypes } from "server/db/cred/model";
import { Post } from "src/utils/helpers/api";
import { Credential } from "src/utils/interfaces";
import { FormBaseOnSubmit } from "src/components/forms/FormBase";

const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    type: Yup.string().oneOf(Object.values(CredentialTypes)).required("Required"),
    worksOn: Yup.string().required("Required"),
    additionalInformation: Yup.string(),
});

interface CredFormValues {
    username: string;
    password: string;
    type: CredentialTypes;
    worksOn: string;
    additionalInformation?: string;
}

type CreateCredFormProps = { onSubmitSuccess?: (newCred: Credential) => void; onClose?: () => void };

export default function CreateCredForm({ onSubmitSuccess, onClose }: CreateCredFormProps): JSX.Element {
    const initialValues: CredFormValues = { username: "", password: "", type: CredentialTypes.DOMAIN, worksOn: "" };

    function getworksOnLabel(credType: CredentialTypes) {
        switch (credType) {
            case CredentialTypes.LOCAL:
                return "Local Device/s the cred works on";
            case CredentialTypes.DOMAIN:
                return "Domain/s the cred works on";
            case CredentialTypes.APPLICATIVE:
                return "Application/s the cred works on";
            default:
                return "Works On";
        }
    }

    const onSubmit: FormBaseOnSubmit = (formData) =>
        Post("cred", formData).then(async (res) => {
            if (res.ok)
                res.json().then((newCred) => {
                    if (onSubmitSuccess) onSubmitSuccess(newCred);
                });
            else {
                const errorMessage = await res.text();
                throw new Error(errorMessage);
            }
        });

    return (
        <FormBase initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} onClose={onClose}>
            {({ values }: FormikProps<Partial<CredFormValues>>) => (
                <>
                    <TextField fieldKey="username" />
                    <TextField fieldKey="password" type="sensitive" />
                    <Select fieldKey="type" selectionList={ArrayToSelectionList(Object.values(CredentialTypes))} />
                    {values.type ? <TextField fieldKey="worksOn" label={getworksOnLabel(values.type)} /> : null}
                    <TextField
                        fieldKey="additionalInformation"
                        label="Additional Info (Optional)"
                        type="multiline"
                        placeholder="Related AD groups, how the cred was acquired, who it belongs to..."
                    />
                </>
            )}
        </FormBase>
    );
}
