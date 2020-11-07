import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as muiColors from "@material-ui/core/colors";

import { PanelButton, PanelButtonProps } from "components/general/Panel";

import customTheme from "../utils/theme";

type ColorObject = Record<string | number, string>;

export type ButtonProps = Omit<PanelButtonProps, "color" | "classes"> & { color?: keyof typeof muiColors; disabledText?: string };
export default function ToolbarButton({ color = "grey", disabledText, ...otherProps }: ButtonProps): JSX.Element {
    const chosenMuiColor: ColorObject = muiColors[color];

    const buttonTheme = createMuiTheme({
        ...customTheme,
        palette: {
            type: "dark",
            primary: {
                main: chosenMuiColor[500],
            },
        },
        overrides: {
            MuiButton: {
                ...customTheme.overrides?.MuiButton,
                containedPrimary: {
                    color: color === "grey" ? "black" : "white",
                },
            },
        },
    });

    return (
        <MuiThemeProvider theme={buttonTheme}>
            <div title={(otherProps.disabled && disabledText) || ""}>
                <PanelButton color="primary" {...otherProps} />
            </div>
        </MuiThemeProvider>
    );
}
