import React, { useState } from "react";
import TextField, { CustomTextFieldProps } from "../TextField";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";

type Props = Omit<CustomTextFieldProps, "type">;

function SensitiveTextField(props: Props) {
    const [showInput, setInputVisibility] = useState(false);

    return (
        <TextField
            {...props}
            type={showInput ? "text" : "password"}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setInputVisibility((state) => !state)} style={{ padding: 5 }} tabIndex={-1}>
                            {showInput ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}

export default SensitiveTextField;
