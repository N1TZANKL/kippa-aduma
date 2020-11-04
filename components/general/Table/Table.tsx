import React from "react";
import { withStyles, createStyles, MuiThemeProvider } from "@material-ui/core/styles";
import MaterialTable, { MaterialTableProps } from "material-table";

import { Children, MuiStyles } from "interfaces";
import { spaceChildren } from "utils/helpers/css";

import customTheme from "./utils/theme";
import customIcons from "./utils/icons";
import CustomToolbar from "./components/toolbar";
import TableButton, { ButtonProps } from "./components/action-button";
import { PanelTitle } from "../Panel";
// import { SvgIconComponent } from '@material-ui/icons';

const styles = () =>
    createStyles({
        titleDiv: {
            display: "flex",
            alignItems: "center",
            ...spaceChildren("horizontally", 10),
        },
        titleText: {
            marginRight: 10,
        },
    });

export type TableAction = ButtonProps & { name?: string; icon?: Children };

type TableProps = MuiStyles & Omit<MaterialTableProps<any>, "title" | "actions"> & { actions: TableAction[]; emptyValueText?: string };
function Table({ classes, actions, options = {}, ...props }: TableProps) {
    return (
        <MuiThemeProvider theme={customTheme}>
            <MaterialTable
                components={{ Toolbar: CustomToolbar }}
                icons={customIcons}
                {...props}
                options={{ ...options, emptyRowsWhenPaging: false }}
                title={
                    <div className={classes.titleDiv}>
                        <PanelTitle className={classes.titleText}>Actions:</PanelTitle>
                        {actions.map(({ name, children, icon, ...action }: TableAction, index) => (
                            <TableButton {...action} key={index}>
                                {children || (
                                    <>
                                        {icon} {name}
                                    </>
                                )}
                            </TableButton>
                        ))}
                    </div>
                }
            />
        </MuiThemeProvider>
    );
}

export default withStyles(styles)(Table);
