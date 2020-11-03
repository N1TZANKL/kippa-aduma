import React, { useMemo, useCallback, useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { MuiStyles, Credential, StringObject } from "interfaces";
import Table, { TableAction } from "components/general/Table/Table";
import SaveIcon from "@material-ui/icons/Save";
import { NotFoundAnimation } from "components/animations";
import EditIcon from "@material-ui/icons/Edit";
import { PanelButton } from "components/general/Panel";
import PasswordCell from "./password-cell";
import CredTypeCell from "./cred-type-cell";
import DeleteIcon from "@material-ui/icons/Delete";
import { saveAs } from "file-saver";
import { unparse } from "papaparse";
import ConfirmationDialog from "components/dialogs/ConfirmationDialog";

const styles = () =>
    createStyles({
        buttonIcon: {
            marginRight: "8px !important",
            paddingRight: 2,
        },
        emptyDataDiv: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        createCredButton: {
            marginTop: 10,
        },
    });

const fieldNameToTitle: StringObject = {
    username: "Username",
    password: "Password",
    type: "Cred Type",
    worksOn: "Works On",
    additionalInformation: "More Info",
};

type TableData = Credential & { tableData?: { id: number; checked: boolean } };
type ExportedCred = Credential & { additionalInformation: string }; // exported cred has default additionalInformation value

type CredsTableProps = MuiStyles & { creds: Credential[]; toggleFormOpen: () => void; removeDeletedCredsFromLocalState: (ids: string[]) => void };
function CredsTable({ classes, creds, toggleFormOpen, removeDeletedCredsFromLocalState }: CredsTableProps) {
    const [selectedCreds, setSelectedCreds] = useState<Credential[]>([]);
    const [isDeleting, setDeleting] = useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

    function toggleDeleteDialogOpen() {
        setDeleteDialogOpen((prevState) => !prevState);
    }

    function exportToCsv(creds: TableData[]) {
        // step 1: map the data, adding a default value to additionalInformation field (since it's optional)
        const baseData = creds.map(({ additionalInformation = "-", ...cred }) => ({ ...cred, additionalInformation }));

        // step 2: replace each cred object's keys with their matching title from fieldNameToTitle
        const dataWithCorrectTitles = baseData.map((cred: ExportedCred) => {
            const newCred: StringObject = {};
            for (const [key, data] of Object.entries(cred)) newCred[fieldNameToTitle[key]] = data;

            return newCred;
        });

        // step 3: convert to CSV + download
        const csvData = unparse(dataWithCorrectTitles, {
            // specify exported columns to prevent unwanted fields from being exported
            columns: Object.values(fieldNameToTitle),
        });
        const file = new File([csvData], "creds.csv", { type: "text/csv;charset=utf-8" });
        saveAs(file);
    }

    const batchDeleteCreds = useCallback(() => {
        const ids = selectedCreds.map((c) => c.id);

        setDeleting(true);
        fetch("/api/cred/deleteCreds", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids }),
        })
            .then(() => {
                removeDeletedCredsFromLocalState(ids);
                setSelectedCreds((prevState) => prevState.filter((c) => !ids.includes(c.id)));
            })
            .finally(() => setDeleting(false));
    }, [selectedCreds]);

    function onSelectionChange(newSelectedCreds: TableData[]) {
        setSelectedCreds(newSelectedCreds);
    }

    const tableActions: TableAction[] = useMemo(
        () => [
            { name: "Create", icon: <EditIcon className={classes.buttonIcon} />, onClick: toggleFormOpen, color: "lightBlue" },
            {
                name: `Export ${selectedCreds.length === 0 ? "All" : "Selected"} Creds`,
                icon: <SaveIcon className={classes.buttonIcon} />,
                onClick: () => exportToCsv(selectedCreds.length === 0 ? creds : selectedCreds),
                color: "green",
            },
            {
                name: `${selectedCreds.length > 0 ? "Delete Selected Creds" : "Batch Delete"}`,
                disabled: isDeleting || selectedCreds.length === 0,
                disabledText: isDeleting ? "Deleting..." : "Select the cred/s you want to delete first!",
                icon: <DeleteIcon className={classes.buttonIcon} />,
                onClick: toggleDeleteDialogOpen,
                color: "deepOrange",
            },
        ],
        [creds, selectedCreds]
    );

    if (!creds || creds.length === 0)
        return (
            <NotFoundAnimation
                message={
                    <div className={classes.emptyDataDiv}>
                        No creds to show... Want to change that?
                        <PanelButton color="primary" className={classes.createCredButton} onClick={toggleFormOpen}>
                            <EditIcon /> Create
                        </PanelButton>
                    </div>
                }
            />
        );

    return (
        <>
            <Table
                columns={[
                    { field: "username", title: fieldNameToTitle["username"], width: "15%" },
                    {
                        field: "password",
                        title: fieldNameToTitle["password"],
                        render: (rowData: Credential) => <PasswordCell password={rowData.password} />,
                        width: "15%",
                    },
                    {
                        field: "type",
                        title: fieldNameToTitle["type"],
                        render: (rowData: Credential) => <CredTypeCell type={rowData.type} />,
                        width: "10%",
                    },
                    { field: "worksOn", title: fieldNameToTitle["worksOn"], width: "20%" },
                    {
                        field: "additionalInformation",
                        title: fieldNameToTitle["additionalInformation"],
                        render: (rowData: Credential) => rowData.additionalInformation || "-",
                        width: "20%",
                    },
                ]}
                data={creds}
                actions={tableActions}
                options={{ selection: true }}
                onSelectionChange={onSelectionChange}
            />
            <ConfirmationDialog
                confirmText="Yes, Delete creds"
                denyText="Return"
                open={deleteDialogOpen}
                onClose={toggleDeleteDialogOpen}
                onConfirm={batchDeleteCreds}
            >
                <div>Are you sure you want to delete these credentials?</div>
                <i>This action is irreversible!</i>
            </ConfirmationDialog>
        </>
    );
}

export default withStyles(styles)(CredsTable);