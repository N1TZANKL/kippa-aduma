import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as muiColors from '@material-ui/core/colors';
import customTheme from "../custom-theme";
import { Color } from '@material-ui/core';
import { PanelButton, PanelButtonProps } from 'components/general/Panel';

export type ButtonProps = Omit<PanelButtonProps, "color" | "classes"> & { color?: keyof typeof muiColors, disabledText?: string }
export default function ToolbarButton({ color = "grey", disabledText, ...otherProps }: ButtonProps) {

    const chosenMuiColor: Color = muiColors[color];

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
                    textShadow: `0 2px 2px ${chosenMuiColor[700]}, 0 2px 2px rgba(0,0,0,0.3)`,
                    "&:disabled": {
                        textShadow: "none"
                    }
                }
            }
        }
    });

    return <MuiThemeProvider theme={buttonTheme}>
        <div title={(otherProps.disabled && disabledText) || ""}>
            <PanelButton color="primary" {...otherProps} />
        </div>
    </MuiThemeProvider>;
}