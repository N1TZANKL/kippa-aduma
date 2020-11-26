import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";

import theme from "src/utils/theme";

export default class MyDocument extends Document {
    // eslint-disable-next-line class-methods-use-this
    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link rel="preload" href="/fonts/Inconsolata/Inconsolata-Regular.ttf" as="font" crossOrigin="" />
                    <link rel="preload" href="/fonts/Inconsolata/Inconsolata-Bold.ttf" as="font" crossOrigin="" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};
