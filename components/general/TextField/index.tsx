import React from "react";
import MuiTextField, { TextFieldProps } from "@material-ui/core/TextField";

export type CustomTextFieldProps = Omit<TextFieldProps, "error"> & {
    errorMessage?: string;
};

function TextField(props: CustomTextFieldProps): React.ReactElement {
    const { errorMessage, ...otherProps } = props;

    return <MuiTextField color="secondary" fullWidth helperText={errorMessage} {...otherProps} error={!!errorMessage} />;
}

export default TextField;
