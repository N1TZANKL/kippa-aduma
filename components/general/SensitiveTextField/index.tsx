import React, { useState, useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";

import TextField, { TextFieldProps } from "../TextField";

type Props = Omit<TextFieldProps, "type">;

function SensitiveTextField(props: Props): React.ReactElement {
    const [showInput, setInputVisibility] = useState(false);
    const onIconClick = useCallback(() => setInputVisibility(state => !state), []);

    return (
        <TextField
            {...props}
            type={showInput ? "text" : "password"}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={onIconClick} style={{ padding: 5 }} tabIndex={-1}>
                            {showInput ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}

export default SensitiveTextField;
