// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createMuiTheme, createPalette } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createPalette" {
    interface Palette {
        primary: PaletteColor;
        secondary: PaletteColor;
    }
    interface SimplePaletteColorOptions {
        main: string;
        dark?: string;
        light?: string;
        veryLight?: string;
        superLight?: string;
    }
}

declare module "@material-ui/core/styles/createMuiTheme" {
    interface Theme {
        constants: {
            appBackground: string;
            appBackgroundDark: string;
            appBackgroundHighlight: string;
        };
    }
    interface ThemeOptions {
        constants: {
            appBackground: string;
            appBackgroundDark: string;
            appBackgroundHighlight: string;
        };
    }
}
