import React from "react";
import MuiTextField, { TextFieldProps } from "@material-ui/core/TextField";

export type CustomTextFieldProps = TextFieldProps & {
    errorMessage?: string;
};

function TextField(props: CustomTextFieldProps) {
    const { errorMessage, ...otherProps } = props;

    return <MuiTextField color="secondary" fullWidth {...otherProps} error={!!errorMessage} helperText={errorMessage || props.helperText} />;
}

export default TextField;
