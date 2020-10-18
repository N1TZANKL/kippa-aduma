import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button, {ButtonProps} from '@material-ui/core/Button';
import * as muiColors from '@material-ui/core/colors';
import customTheme from "../custom-theme";
import { Color } from '@material-ui/core';

type ToolbarButtonProps = Omit<ButtonProps, "color"> & {color: keyof typeof muiColors, disabledText?: string}
export default function ToolbarButton({color, disabledText, ...otherProps}: ToolbarButtonProps) {

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
                    textShadow: `0 2px 2px ${chosenMuiColor[700]}, 0 2px 2px rgba(0,0,0,0.5)`
                }
            }
        }
    });

    return <MuiThemeProvider theme={buttonTheme}>
        <div title={(otherProps.disabled && disabledText) || ""}>
            <Button color="primary" variant="contained" {...otherProps} />
        </div>
    </MuiThemeProvider>;
}