import React from "react";
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from "@material-ui/core/TextField";

export type TextFieldProps = Omit<MuiTextFieldProps, "error"> & {
    errorMessage?: string;
};

function TextField(props: TextFieldProps): React.ReactElement {
    const { errorMessage, helperText, ...otherProps } = props;

    return <MuiTextField color="secondary" fullWidth helperText={errorMessage || helperText} {...otherProps} error={!!errorMessage} />;
}

export default TextField;
