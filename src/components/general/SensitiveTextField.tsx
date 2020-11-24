import React, { useState } from "react";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";

import TextField, { TextFieldProps } from "./TextField";
import IconButton from "./IconButton";

type Props = Omit<TextFieldProps, "type">;

function SensitiveTextField(props: Props): React.ReactElement {
    const [showInput, setInputVisibility] = useState(false);

    return (
        <TextField
            {...props}
            type={showInput ? "text" : "password"}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setInputVisibility((state) => !state)}
                            tabIndex={-1}
                            p={5}
                            icon={showInput ? VisibilityOffIcon : VisibilityIcon}
                        />
                    </InputAdornment>
                ),
            }}
        />
    );
}

export default SensitiveTextField;
