import React from "react";
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from "@material-ui/core/TextField";

export type TextFieldProps = Omit<MuiTextFieldProps, "error"> & {
    errorMessage?: string;
};

export default function TextField({ errorMessage, helperText, ...otherProps }: TextFieldProps): JSX.Element {
    return <MuiTextField color="secondary" fullWidth helperText={errorMessage || helperText} {...otherProps} error={!!errorMessage} />;
}
