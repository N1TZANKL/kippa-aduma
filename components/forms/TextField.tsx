import React from "react";
import { useField } from "formik";

import TextField, { TextFieldProps } from "components/general/TextField";
import SensitiveTextField from "components/general/SensitiveTextField";
import { firstLetterUppercase } from "utils/helpers/strings";

type FormikTextFieldProps = Omit<TextFieldProps, "type"> & { fieldKey: string; type?: "text" | "sensitive" | "multiline" };
export default function FormikTextField({ fieldKey, type = "text", label, ...props }: FormikTextFieldProps): JSX.Element {
    const [field, meta] = useField(fieldKey);

    const FieldComponent = type === "sensitive" ? SensitiveTextField : TextField;

    const additionalProps = type === "multiline" ? { rowsMax: 5, multiline: true } : {};

    return (
        <FieldComponent
            id={field.name}
            name={field.name}
            value={field.value}
            label={label || firstLetterUppercase(field.name)}
            onChange={field.onChange}
            errorMessage={(meta.touched && meta.error) || ""}
            {...additionalProps}
            {...props}
        />
    );
}
