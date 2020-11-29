import React, { useRef } from "react";
import * as Yup from "yup";
import { FormikProps } from "formik";
import Box from "@material-ui/core/Box";

import { AssignmentStatuses } from "server/db/assignment/model";
import { FormBase, TextField, DateTimeField, Select } from "src/components/forms";
import { Assignment } from "src/utils/interfaces";
import { Post } from "src/utils/helpers/api";
import { FormBaseOnSubmit } from "src/components/forms/FormBase";
import { UserSessionObject } from "utils/session";
import Checkbox from "src/components/general/Checkbox";

const newAssignmentStatusOptions = [AssignmentStatuses.TODO, AssignmentStatuses.IN_PROGRESS];

const validationSchema = Yup.object({
    description: Yup.string().required("Required"),
    additionalInformation: Yup.string(),
    status: Yup.string().oneOf(newAssignmentStatusOptions).default(AssignmentStatuses.TODO).required("Required"),
    deadlineAt: Yup.date(), //.required("Required"),
    //assigneeId: Yup.string(), //.required("Required"),
});

interface AssignmentFormValues {
    description: string;
    status: AssignmentStatuses.TODO | AssignmentStatuses.IN_PROGRESS;
    additionalInformation?: string;
    deadlineAt?: string | null;
    assigneeId?: string;
}

type CreateAssignmentFormProps = { addAssignment: (newAssignment: Assignment) => void; onClose?: () => void; users: UserSessionObject[] };

export default function CreateAssignmentForm({ addAssignment, onClose, users }: CreateAssignmentFormProps): JSX.Element {
    const formRef = useRef<FormikProps<AssignmentFormValues> | null>(null);

    const initialValues: AssignmentFormValues = { status: AssignmentStatuses.TODO, description: "", assigneeId: "", deadlineAt: null };

    const onSubmit: FormBaseOnSubmit = (formData) =>
        Post("assignment", formData).then(async (res) => {
            if (res.ok) res.json().then((newAssignment) => addAssignment(newAssignment));
            else {
                const errorMessage = await res.text();
                throw new Error(errorMessage);
            }
        });

    function onToggleAssignCheckbox(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        if (!formRef.current) return;
        formRef.current.setFieldValue("status", checked ? AssignmentStatuses.IN_PROGRESS : AssignmentStatuses.TODO);
    }

    return (
        <FormBase validationSchema={validationSchema} onSubmit={onSubmit} initialValues={initialValues} onClose={onClose} ref={formRef}>
            {({ values }: FormikProps<Partial<AssignmentFormValues>>) => {
                const isAssigned = values.status === AssignmentStatuses.IN_PROGRESS;
                return (
                    <>
                        <TextField fieldKey="description" type="multiline" />
                        <TextField fieldKey="additionalInformation" label="Additional Info (Optional)" type="multiline" />
                        <Box marginBottom="-15px" paddingTop="10px">
                            <Checkbox label="Set assignee & deadline" checked={isAssigned} onChange={onToggleAssignCheckbox} />
                        </Box>
                        <Select
                            label="Assignee"
                            fieldKey="assigneeId"
                            selectionList={users.map((u) => ({ label: `${u.nickname} (${u.username})`, value: u.id }))}
                            disabled={!isAssigned}
                        />
                        <DateTimeField fieldKey="deadlineAt" label="Deadline" hide="time" disabled={!isAssigned} />
                    </>
                );
            }}
        </FormBase>
    );
}
