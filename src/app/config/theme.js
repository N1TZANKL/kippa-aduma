import { createMuiTheme } from "@material-ui/core/styles";
import * as muiColors from "@material-ui/core/colors";

const primaryColor = muiColors.red;
const secondaryColor = muiColors.lightBlue;

const customTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: primaryColor[600],
            dark: primaryColor[900],
            light: primaryColor[400],
            veryLight: primaryColor[200],
            superLight: primaryColor[100],
        },
        secondary: {
            main: secondaryColor[500],
            dark: secondaryColor[700],
            light: secondaryColor[300],
            veryLight: secondaryColor[200],
            superLight: secondaryColor[100],
        },
        constants: {
            ...muiColors,
            appBackground: muiColors.blueGrey[800],
            appBackgroundDark: muiColors.blueGrey[900],
            appBackgroundHighlight: muiColors.blueGrey[700],
        },
    },
});

export default createMuiTheme({
    palette: customTheme.palette,
    overrides: {
        MuiPaper: {
            root: {
                backgroundColor: customTheme.palette.constants.appBackground,
            },
        },
        MuiPopover: {
            paper: {
                backgroundColor: customTheme.palette.constants.appBackgroundHighlight,
            },
        },
        MuiIconButton: {
            root: {
                padding: 6,
            },
        },
    },
});
