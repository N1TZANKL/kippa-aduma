import React, { useEffect } from "react";
import { ThemeProvider, withStyles, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Head from "next/head";
import { hexToRGB } from "utils/helpers/css.ts";

import theme from "config/theme";

import 'emoji-mart/css/emoji-mart.css';


const styles = () =>
    createStyles({
        "@global": {
            "*::-webkit-scrollbar": {
                width: 8,
                height: 8,
            },
            "*::-webkit-scrollbar-track": {
                "-webkit-box-shadow": `inset 0 0 6px rgba(0,0,0,0.4)`,
            },
            "*::-webkit-scrollbar-thumb": {
                borderRadius: 1,
                backgroundColor: hexToRGB(theme.palette.primary.main, 0.7),
                "-webkit-box-shadow": "inset 0 0 3px rgba(0,0,0,0.2)",
            },
            "::-webkit-scrollbar-corner": {
                "-webkit-box-shadow": `inset 0 0 6px rgba(0,0,0,0.4)`,
            },
        },
    });

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Kippa Aduma</title>
            </Head>
            <ThemeProvider theme={theme}>
                <style global jsx>
                    {`
                        html,
                        body,
                        body > div:first-child,
                        div#__next,
                        div#__next > div {
                            height: 100%;
                        }
                    `}
                </style>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}

export default withStyles(styles)(MyApp);
