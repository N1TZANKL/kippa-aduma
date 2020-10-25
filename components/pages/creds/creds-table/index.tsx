import React, { useMemo, useCallback } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { MuiStyles, Credential } from 'interfaces';
import Table, { TableAction } from "components/general/Table";
import SaveIcon from '@material-ui/icons/Save';
import NotFoundAnimation from "components/animations/not-found";
import EditIcon from '@material-ui/icons/Edit';
import { PanelButton } from "components/general/Panel";
import PasswordCell from "./password-cell";
import CredTypeCell from "./cred-type-cell";
import DeleteIcon from '@material-ui/icons/Delete';

const styles = () => createStyles({
    buttonIcon: {
        marginRight: "8px !important",
        paddingRight: 2
    },
    emptyDataDiv: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    createCredButton: {
        marginTop: 10
    }
});

type CredsTableProps = MuiStyles & { creds: Array<Credential>; toggleFormOpen: () => void }
function CredsTable({ classes, creds, toggleFormOpen }: CredsTableProps) {

    function exportToCsv(creds: Array<Credential>) {
        // TODO: implement
    }

    const exportCredentials = useCallback(() => exportToCsv(creds), [creds]) // Change to currently shown creds?

    const tableActions: TableAction[] = useMemo(() => ([
        { name: "Create", icon: <EditIcon className={classes.buttonIcon} />, onClick: toggleFormOpen, color: "lightBlue" },
        { name: "Delete", icon: <DeleteIcon className={classes.buttonIcon} />, onClick: undefined, color: "deepOrange" },
        { name: "Export to CSV", icon: <SaveIcon className={classes.buttonIcon} />, onClick: exportCredentials, color: "green" },
    ]), [creds])

    if (!creds || creds.length === 0) return <NotFoundAnimation message={<div className={classes.emptyDataDiv}>
        No creds to show... Want to change that?
        <PanelButton color="primary" className={classes.createCredButton} onClick={toggleFormOpen}>
            <EditIcon /> Create
        </PanelButton>
    </div>} />;

    return <Table columns={[
        { title: "Username", field: "username", width: "15%" },
        { title: "Password", field: "password", render: (rowData: Credential) => <PasswordCell password={rowData.password} />, width: "15%" },
        { title: "Cred Type", field: "type", render: (rowData: Credential) => <CredTypeCell type={rowData.type} />, width: "10%" },
        { title: "Works On", field: "worksOn", width: "20%" },
        { title: "More Info", field: "additionalInformation", render: (rowData: Credential) => rowData.additionalInformation || "-", width: "20%" },
    ]} data={creds} actions={tableActions} options={{ selection: true }} />
}

export default withStyles(styles)(CredsTable);