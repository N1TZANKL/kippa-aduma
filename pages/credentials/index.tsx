import React, { useState } from "react";
import { Credential, UserSessionObject } from "interfaces";
import { withUserSession } from "utils/session";
import { getAllCreds } from "pages/api/cred/getAll";
import PageLayout from "components/layouts/MainLayout";
import { CreateCredForm, CredsTable } from "components/pages/creds";
import FormDialog from "components/dialogs/FormDialog";
import { resetServerContext } from "react-beautiful-dnd";

type CredentialsPageProps = { user: UserSessionObject; creds: Array<Credential> };
export default function CredentialsPage({ user, creds }: CredentialsPageProps) {
    const [allCreds, setCreds] = useState<Array<Credential>>(creds);
    const [isFormOpen, setFormOpen] = useState<boolean>(false);

    const addCredential = (newCred: Credential) => setCreds((prevState) => [...prevState, newCred]);
    const toggleFormOpen = () => setFormOpen((prevState) => !prevState);

    function removeDeletedCredsFromLocalState(ids: string[]) {
        setCreds((prevState) => prevState.filter((cred) => !ids.includes(cred.id)));
    }

    return (
        <PageLayout user={user}>
            <CredsTable creds={allCreds} toggleFormOpen={toggleFormOpen} removeDeletedCredsFromLocalState={removeDeletedCredsFromLocalState} />
            <FormDialog title="Add Cred" open={isFormOpen} onClose={toggleFormOpen}>
                <CreateCredForm addCred={addCredential} onClose={toggleFormOpen} />
            </FormDialog>
        </PageLayout>
    );
}

export const getServerSideProps = withUserSession(async () => {
    const props: any = {};

    const getCreds = getAllCreds()
        .then((data) => {
            props["creds"] = data;
            return data;
        })
        .catch((e) => {
            props["creds"] = null;
            return;
        });

    await getCreds;

    // this shit is called to prevent errors from react-beautiful-dnd library,
    // which is used by material-table (the creds table's base library)
    resetServerContext();

    return { props };
});
