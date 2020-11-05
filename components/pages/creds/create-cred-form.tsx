import React from "react";
import * as Yup from "yup";
import { FormikProps } from "formik";

import { ArrayToSelectionList } from "components/general/Select";
import { FormBase, TextField, Select } from "components/forms";
import { CredentialTypes } from "db/cred/model";
import { GenericObject, SetState } from "interfaces";
import { Post } from "utils/helpers/api";

const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    type: Yup.string().oneOf(Object.values(CredentialTypes)).required("Required"),
    worksOn: Yup.string().required("Required"),
    additionalInformation: Yup.string(),
});

interface FormValues {
    username: string;
    password: string;
    type: CredentialTypes;
    worksOn: string;
    additionalInformation: string;
}

type CreateCredFormProps = { addCred: (newCred: Credential) => void; onClose?: () => void };
export default function CreateCredForm({ addCred, onClose }: CreateCredFormProps): JSX.Element {
    function onSubmit(formData: GenericObject, setFormError: SetState<string>) {
        return Post("cred", formData)
            .then(async (res) => {
                if (res.ok) {
                    res.json().then((newCred) => addCred(newCred));
                    if (onClose) onClose();
                } else setFormError(await res.text());
            })
            .catch((e) => setFormError(e.message));
    }

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

    return (
        <FormBase validationSchema={validationSchema} onSubmit={onSubmit} initialValues={{ username: "", password: "", type: "", worksOn: "" }}>
            {({ values }: FormikProps<FormValues>) => (
                <>
                    <TextField fieldKey="username" />
                    <TextField fieldKey="password" type="sensitive" />
                    <Select fieldKey="type" selectionList={ArrayToSelectionList(Object.values(CredentialTypes))} />
                    {values.type && <TextField fieldKey="worksOn" label={getworksOnLabel(values.type)} />}
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
