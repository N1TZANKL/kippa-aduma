// This library is not too typescript-friendly, so for now, this is written in JS.

import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import customTheme from "./custom-theme";
import customIcons from "./custom-icons";
import MaterialTable from "material-table";
import CustomToolbar from "./custom-toolbar";

export default function Table({ options = {}, ...props }) {

    return <MuiThemeProvider theme={customTheme}>
        <MaterialTable components={{ Toolbar: CustomToolbar }} icons={customIcons} {...props} options={{
            ...options, emptyRowsWhenPaging: false
        }} />
    </MuiThemeProvider>;
}

Table.propTypes = MaterialTable.propTypes;