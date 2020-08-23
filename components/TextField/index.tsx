import React from "react";
import MuiTextField, { TextFieldProps } from "@material-ui/core/TextField";
import { MuiStyles } from "interfaces";

export type CustomTextFieldProps = TextFieldProps & {
    errorMessage?: string;
};

function TextField(props: CustomTextFieldProps) {
    const { errorMessage, ...otherProps } = props;

    return <MuiTextField color="secondary" fullWidth {...otherProps} error={!!errorMessage} helperText={errorMessage || props.helperText} />;
}

export default TextField;
