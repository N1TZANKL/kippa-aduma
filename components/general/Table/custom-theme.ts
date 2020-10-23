import theme from "config/theme";
import { createMuiTheme, lighten } from "@material-ui/core/styles";

const { overrides, ...baseTheme } = theme;

export default createMuiTheme({
    ...baseTheme,
    overrides: {
        ...overrides,
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
                font: "bold 18px monospace !important",
                boxShadow: "rgba(0,0,0,0.2) 0 4px 1px -2px !important"
            },
        },
        MuiTablePagination: {
            input: {
                marginRight: "15px !important"
            },
            select: {
                display: "flex",
                justifyContent: "center"
            }
        },
        MuiCheckbox: {
            ...overrides?.MuiCheckbox,
            root: {
                marginLeft: "15px !important",
                marginRight: "15px !important",
            }
        },
        MuiButton: {
            ...overrides?.MuiButton,
            root: {
                margin: "0 5px",
                padding: "4px 12px",
                fontSize: "85%"
            }
        }
    }
})