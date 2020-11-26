import { createMuiTheme, lighten } from "@material-ui/core/styles";

import theme from "src/utils/theme";
import { after, before } from "src/utils/helpers/css";

const { overrides, ...baseTheme } = theme;

export default createMuiTheme({
    ...baseTheme,
    overrides: {
        ...overrides,
        // general table overrides
        MuiTableRow: {
            root: {
                cursor: "pointer",
                borderBottom: `2px solid ${theme.constants.appBackground}`,
                backgroundColor: lighten(theme.constants.appBackground, 0.05),
                fontSize: 14,
            },
            footer: {
                backgroundColor: theme.constants.appBackgroundHighlight,
                padding: "0 20px",
            },
        },
        MuiTableCell: {
            head: {
                backgroundColor: `${lighten(theme.constants.appBackgroundHighlight, 0.03)} !important`,
                font: "bold 18px Inconsolata !important",
                boxShadow: "rgba(0,0,0,0.2) 0 4px 1px -2px !important",
                letterSpacing: 1.15,
            },
        },
        MuiTablePagination: {
            input: {
                marginRight: "15px !important",
            },
            select: {
                display: "flex",
                justifyContent: "center",
            },
        },
        // selection checkbox overrides
        MuiCheckbox: {
            ...overrides?.MuiCheckbox,
            root: {
                marginLeft: "15px !important",
                marginRight: "15px !important",
            },
        },
        // action button overrides
        MuiButton: {
            ...overrides?.MuiButton,
            root: {
                margin: "0 5px",
                padding: "4px 12px",
                fontSize: "85%",
            },
        },
        // search field overrides
        MuiInput: {
            root: {
                border: "1px solid rgba(255,255,255,0.2)",
                height: 35,
                padding: "2px 10px",
                fontSize: 14,
                borderRadius: 2,
                width: 275,
            },
            underline: {
                ...before("", {
                    borderBottomWidth: "0px !important",
                }),
                ...after("", {
                    borderBottomWidth: "0px !important",
                }),
            },
        },
        MuiSvgIcon: {
            fontSizeSmall: {
                pointerEvents: "none",
            },
        },
    },
});
