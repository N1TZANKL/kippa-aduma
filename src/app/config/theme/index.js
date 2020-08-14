import { createMuiTheme } from "@material-ui/core/styles";
import * as muiColors from "@material-ui/core/colors";

const primaryColor = muiColors.red;
const secondaryColor = muiColors.lightBlue;

export default createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: primaryColor[600],
            dark: primaryColor[800],
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
