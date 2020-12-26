import React, { useRef, useContext } from "react";
import * as Yup from "yup";
import { FormikProps } from "formik";
import moment from "moment";
import Box from "@material-ui/core/Box";

import { AssignmentStatuses } from "server/db/assignment/model";
import { FormBase, TextField, DateTimeField, Select } from "src/components/forms";
import { Assignment } from "src/utils/interfaces";
import { Patch, Post } from "src/utils/helpers/api";
import { FormBaseOnSubmit } from "src/components/forms/FormBase";
import Checkbox from "src/components/general/Checkbox";
import AssignmentsContext from "src/pages/assignments/context";

const newAssignmentStatusOptions = [AssignmentStatuses.TODO, AssignmentStatuses.IN_PROGRESS];

const validationSchema = Yup.object({
    description: Yup.string().required("Required"),
    additionalInformation: Yup.string(),
    status: Yup.string().oneOf(newAssignmentStatusOptions).default(AssignmentStatuses.TODO).required("Required"),
    deadlineAt: Yup.date().when("status", {
        is: AssignmentStatuses.IN_PROGRESS,
        then: Yup.date().required("Required"),
        otherwise: Yup.date().nullable(),
    }),
    assigneeId: Yup.string().when("status", {
        is: AssignmentStatuses.IN_PROGRESS,
        then: Yup.string().required("Required"),
    }),
});

interface AssignmentFormValues {
    description: string;
    status: AssignmentStatuses.TODO | AssignmentStatuses.IN_PROGRESS;
    additionalInformation?: string;
    deadlineAt?: string | null;
    assigneeId?: string;
}

type CreateAssignmentFormProps = {
    onClose?: () => void;
    // a non-finished task
    editedAssignment?: Omit<Assignment, "status"> & { status: AssignmentStatuses.TODO | AssignmentStatuses.IN_PROGRESS };
};

export default function CreateAssignmentForm({ onClose, editedAssignment }: CreateAssignmentFormProps): JSX.Element {
    const formRef = useRef<FormikProps<AssignmentFormValues> | null>(null);

    const { addAssignment, replaceAssignment, users, user } = useContext(AssignmentsContext);

    const initialValues: AssignmentFormValues = {
        status: editedAssignment?.status || AssignmentStatuses.TODO,
        description: editedAssignment?.description || "",
        additionalInformation: editedAssignment?.additionalInformation || "",
        assigneeId: editedAssignment?.assignee?.id || "",
        deadlineAt: editedAssignment?.deadlineAt || null,
    };

    const onSubmit: FormBaseOnSubmit = (formData) => {
        const { deadlineAt, assigneeId, ...todoFormData } = formData;
        const requestData = formData.status === AssignmentStatuses.TODO ? todoFormData : formData;

        const assignmentId = editedAssignment?.id;
        const request = () =>
            assignmentId ? Patch("assignment", { action: "edit", data: { ...requestData, assignmentId } }) : Post("assignment", requestData);
        const callback = assignmentId ? replaceAssignment : addAssignment;

        return request().then(async (res) => {
            if (res.ok) res.json().then((newAssignment) => callback(newAssignment));
            else {
                const errorMessage = await res.text();
                throw new Error(errorMessage);
            }
        });
    };

    function onToggleAssignCheckbox(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        if (!formRef.current) return;

        const { setFieldValue, values } = formRef.current;

        setFieldValue("status", checked ? AssignmentStatuses.IN_PROGRESS : AssignmentStatuses.TODO);
        if (!values.deadlineAt) setFieldValue("deadlineAt", moment().add(1, "day").toISOString());
        if (!values.assigneeId) setFieldValue("assigneeId", user.id);
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
                            <Checkbox
                                label="Set assignee & deadline"
                                checked={isAssigned}
                                onChange={onToggleAssignCheckbox}
                                // if assignment was already started - cannot go back
                                disabled={editedAssignment?.status === AssignmentStatuses.IN_PROGRESS}
                            />
                        </Box>
                        <Select
                            label="Assignee"
                            fieldKey="assigneeId"
                            selectionList={users.map((u) => ({ label: `${u.nickname} (${u.username})`, value: u.id }))}
                            disabled={!isAssigned}
                        />
                        <DateTimeField
                            fieldKey="deadlineAt"
                            label="Deadline"
                            hide="time"
                            disabled={!isAssigned}
                            datePickerProps={{ disablePast: true }}
                        />
                    </>
                );
            }}
        </FormBase>
    );
}
