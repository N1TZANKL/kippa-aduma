import React, { useState } from "react";
import { resetServerContext } from "react-beautiful-dnd";

import { Credential, UserSessionObject } from "interfaces";
import { withUserSession } from "utils/session";
import { getAllCreds } from "db/cred/controller";
import PageLayout from "src/components/layouts/MainLayout";
import { CreateCredForm, CredsTable } from "src/pages/creds";
import FormDialog from "src/components/dialogs/FormDialog";

type CredentialsPageProps = { user: UserSessionObject; creds?: Credential[] };
export default function CredentialsPage({ user, creds }: CredentialsPageProps): JSX.Element {
    const [allCreds, setCreds] = useState<Credential[]>(creds || []);
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
    const props: Omit<CredentialsPageProps, "user"> = {};

    const getCreds = getAllCreds()
        .then((data) => {
            props.creds = data;
            return data;
        })
        .catch(() => {
            props.creds = undefined;
        });

    await getCreds;

    // this shit is called to prevent errors from react-beautiful-dnd library,
    // which is used by material-table (the creds table's base library)
    resetServerContext();

    return { props };
});
