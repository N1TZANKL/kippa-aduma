import React from "react";
import dynamic from "next/dynamic";
import { WithStyles, withStyles, createStyles, Theme, lighten, darken } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

import PageLayout from "src/components/layouts/MainLayout";
import { UserSessionObject, withUserSession } from "utils/session";
import { before } from "src/utils/helpers/css";

const FileManagerComponent = dynamic(() => import("src/pages/storage/file-manager"), {
    ssr: false,
});

const styles = (theme: Theme) =>
    createStyles({
        "@global": {
            ".oc-fm--file-navigator": {
                backgroundColor: `${theme.constants.appBackground} !important`,
            },
            ".oc-fm--toolbar__item": {
                backgroundColor: "transparent !important",
            },
            ".oc-fm--context-menu__content": {
                backgroundColor: `${theme.constants.appBackgroundHighlight} !important`,
            },
            ".oc-fm--toolbar__item-icon": {
                fill: "white !important",
                "& > svg": {
                    fill: "white !important",
                },
            },
            ".oc-fm--dropdown-menu-item__icon": {
                fill: "white !important",
                "& > svg": {
                    fill: "white !important",
                },
            },
            ".oc-fm--dropdown-menu-item": {
                "&:hover": {
                    backgroundColor: `${lighten(theme.constants.appBackgroundHighlight, 0.05)} !important`,
                },
            },
            ".oc-fm--file-navigator__location-bar": {
                order: -2,
            },
            ".oc-fm--location-bar": {
                backgroundColor: `${theme.constants.appBackgroundHighlight} !important`,
                borderBottom: "1px solid rgba(255,255,255,0.1) !important",
                boxShadow: "1px 1px 1px rgba(0,0,0,0.2)",
                height: 40,
                ...before("[Current Path] ", {
                    padding: "0 15px 0 10px",
                    marginRight: 10,
                    borderRight: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.5)",
                    alignSelf: "center",
                    fontFamily: "Inconsolata",
                }),
            },
            ".oc-fm--location-bar__item": {
                color: "white !important",
                "&:hover": {
                    backgroundColor: `${lighten(theme.constants.appBackgroundHighlight, 0.05)} !important`,
                },
            },
            ".oc-fm--name-cell__icon": {
                backgroundColor: "rgba(255,255,255,0.75) !important",
                width: "28px !important",
                height: "28px !important",
            },
            ".oc-fm--name-cell__icon-image": {
                width: "20px !important",
                height: "20px !important",
            },
            ".oc-fm--no-files-found-stub": {
                backgroundColor: `${theme.constants.appBackground} !important`,
                "& > *": {
                    color: "white !important",
                    fill: "white !important",
                },
            },
            ".oc-fm--header-cell": {
                color: "white !important",
                fontFamily: "Inconsolata",
                fontWeight: "normal !important",
            },
            ".oc-fm--header-cell__sort-icon": {
                fill: "white !important",
            },
            ".oc-fm--file-navigator__toolbar": {
                borderBottom: `1px solid rgba(255,255,255,0.1) !important`,
                backgroundColor: `${theme.constants.appBackgroundHighlight} !important`,
                order: -1,
                padding: "4px !important",
            },
            ".oc-fm--list-view__row:hover:not(.oc-fm--list-view__row--selected):not(.oc-fm--list-view__row--loading)": {
                backgroundColor: `${darken(theme.constants.appBackgroundHighlight, 0.07)} !important`,
            },
            ".oc-fm--name-cell__title": {
                color: "white",
                fontWeight: "normal !important",
            },
            ".oc-fm--cell": {
                color: "white",
            },
            ".ReactVirtualized__Table__headerRow": {
                borderBottom: `1px solid rgba(255,255,255,0.1) !important`,
                backgroundColor: `${lighten(theme.constants.appBackground, 0.05)} !important`,
            },
            ".oc-fm--toolbar__items": {
                borderRight: `none !important`,
            },
            ".oc-fm--loading-cell__content": {
                backgroundColor: `${darken(theme.constants.appBackgroundHighlight, 0.04)} !important`,
                "&:after": {
                    content: "none !important",
                },
            },
            ".oc-fm--location-bar__item-name": {
                fontFamily: "Inconsolata",
                color: "rgba(255,255,255,0.65) !important",
                fontWeight: "normal !important",
            },
            ".oc-fm--location-bar__item--last": {
                "& > *": { color: "white !important" },
            },
            ".oc-fm--location-bar__item-arrow": {
                fill: "rgba(255,255,255,0.5) !important",
                marginLeft: "0px !important",
            },
            ".oc-fm--location-bar__item-name--loading:after": {
                content: "none !important",
            },
            ".oc-fm--list-view__row--selected": {
                backgroundColor: `${theme.palette.secondary.dark} !important`,
            },
            // DIALOG-RELATED STYLING
            ".oc-fm--file-navigator__view-loading-overlay": {
                backgroundColor: "rgba(0,0,0,0.5) !important",
            },
            ".oc-fm--dialog": {
                backgroundColor: `${theme.constants.appBackgroundHighlight} !important`,
                padding: "20px !important",
                "& > div *": {
                    color: "white",
                    fontWeight: "normal",
                },
            },
            ".oc-fm--dialog__header": {
                fontWeight: "bold !important",
                fontFamily: "Inconsolata",
                marginBottom: "20px !important",
            },
            ".oc-fm--dialog__input": {
                backgroundColor: `rgba(255,255,255,0.15) !important`,
                marginTop: 5,
            },
            ".oc-fm--dialog__validation-error": {
                color: `${deepOrange[500]} !important`,
            },
            ".oc-fm--dialog__horizontal-group": {
                borderTop: "none !important",
            },
            ".oc-fm--dialog__button--default": {
                fontFamily: "Inconsolata !important",
                color: "white !important",
                backgroundColor: `${lighten(theme.constants.appBackgroundHighlight, 0.1)} !important`,
            },
            ".oc-fm--dialog__button--primary": {
                fontFamily: "Inconsolata !important",
                color: "white !important",
                backgroundColor: `${theme.palette.secondary.main} !important`,
                "&:disabled": {
                    color: "rgba(0,0,0,0.5) !important",
                    backgroundColor: `rgba(255,255,255,0.5) !important`,
                },
            },
        },
    });

type StorageProps = WithStyles<typeof styles> & { user: UserSessionObject };

function Storage({ user }: StorageProps) {
    return (
        <PageLayout noPadding user={user}>
            <FileManagerComponent />
        </PageLayout>
    );
}

export default withStyles(styles)(Storage);

export const getServerSideProps = withUserSession();
