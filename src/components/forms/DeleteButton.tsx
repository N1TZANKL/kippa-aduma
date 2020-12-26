import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import Button, { ButtonProps } from "@material-ui/core/Button";

import theme from "src/utils/theme";

export const DELETE_BUTTON_COLOR = "deepOrange";

export default function DeleteButton({ children = "Delete", ...otherProps }: Omit<ButtonProps, "color">): JSX.Element {
    const buttonTheme = createMuiTheme({
        ...theme,
        palette: {
            type: "dark",
            primary: { main: deepOrange[500] },
        },
    });

    return (
        <MuiThemeProvider theme={buttonTheme}>
            <Button color="primary" variant="contained" style={{ minWidth: 95 }} {...otherProps}>
                {children}
            </Button>
        </MuiThemeProvider>
    );
}
