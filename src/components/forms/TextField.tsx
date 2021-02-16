import React, { useEffect } from "react";
import { useField } from "formik";

import TextField, { TextFieldProps } from "src/components/general/TextField";
import SensitiveTextField from "src/components/general/SensitiveTextField";
import { firstLetterUppercase } from "src/utils/helpers/strings";

type FormikTextFieldProps = Omit<TextFieldProps, "type"> & { fieldKey: string; type?: "text" | "sensitive" | "multiline" };
export default function FormikTextField({ fieldKey, type = "text", label, ...props }: FormikTextFieldProps): JSX.Element {
    const [field, meta, helpers] = useField(fieldKey);

    useEffect(() => {
        if (field.value && !meta.touched) helpers.setTouched(true);
    }, [field.value]);

    const FieldComponent = type === "sensitive" ? SensitiveTextField : TextField;

    const additionalProps = type === "multiline" ? { rowsMax: 5, multiline: true } : {};

    return (
        <FieldComponent
            id={field.name}
            name={field.name}
            value={field.value}
            label={label || firstLetterUppercase(field.name)}
            onChange={field.onChange}
            errorMessage={meta.touched ? meta.error : ""}
            {...additionalProps}
            {...props}
        />
    );
}
