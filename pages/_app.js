import React, { useEffect } from "react";
import theme from "config/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <style global jsx>{`
                html,
                body,
                body > div:first-child,
                div#__next,
                div#__next > div {
                    height: 100%;
                    overflow: hidden;
                }
            `}</style>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
