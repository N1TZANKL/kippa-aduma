import React, { useRef, useContext } from "react";
import * as Yup from "yup";
import { FormikProps } from "formik";
import moment from "moment";
import Box from "@material-ui/core/Box";

import { TaskStatuses } from "server/db/task/model";
import { FormBase, TextField, DateTimeField, Select } from "src/components/forms";
import { Task } from "src/utils/interfaces";
import { Patch, Post } from "src/utils/helpers/api";
import { FormBaseOnSubmit } from "src/components/forms/FormBase";
import Checkbox from "src/components/general/Checkbox";
import TasksContext from "src/pages/tasks/context";

const newTaskStatusOptions = [TaskStatuses.TODO, TaskStatuses.IN_PROGRESS];

const validationSchema = Yup.object({
    description: Yup.string().required("Required"),
    additionalInformation: Yup.string(),
    status: Yup.string().oneOf(newTaskStatusOptions).default(TaskStatuses.TODO).required("Required"),
    deadlineAt: Yup.date().when("status", {
        is: TaskStatuses.IN_PROGRESS,
        then: Yup.date().required("Required"),
        otherwise: Yup.date().nullable(),
    }),
    assigneeId: Yup.string().when("status", {
        is: TaskStatuses.IN_PROGRESS,
        then: Yup.string().required("Required"),
    }),
});

interface TaskFormValues {
    description: string;
    status: TaskStatuses.TODO | TaskStatuses.IN_PROGRESS;
    additionalInformation?: string;
    deadlineAt?: string | null;
    assigneeId?: string;
}

type CreateTaskFormProps = {
    onClose?: () => void;
    // a non-finished task
    editedTask?: Omit<Task, "status"> & { status: TaskStatuses.TODO | TaskStatuses.IN_PROGRESS };
};

export default function CreateTaskForm({ onClose, editedTask }: CreateTaskFormProps): JSX.Element {
    const formRef = useRef<FormikProps<TaskFormValues> | null>(null);

    const { addTask, replaceTask, users, user } = useContext(TasksContext);

    const initialValues: TaskFormValues = {
        status: editedTask?.status || TaskStatuses.TODO,
        description: editedTask?.description || "",
        additionalInformation: editedTask?.additionalInformation || "",
        assigneeId: editedTask?.assignee?.id || "",
        deadlineAt: editedTask?.deadlineAt || null,
    };

    const onSubmit: FormBaseOnSubmit = (formData) => {
        const { deadlineAt, assigneeId, ...todoFormData } = formData;
        const requestData = formData.status === TaskStatuses.TODO ? todoFormData : formData;

        const taskId = editedTask?.id;
        const request = () => (taskId ? Patch("task", { action: "edit", data: { ...requestData, taskId } }) : Post("task", requestData));

        // if created through home page, addTask/replaceTask would not be available, therefore this check.
        let callback: typeof addTask | null = null;
        if (addTask && replaceTask) callback = taskId ? replaceTask : addTask;

        return request().then(async (res) => {
            if (res.ok)
                res.json().then((newTask) => {
                    if (callback) callback(newTask);
                });
            else {
                const errorMessage = await res.text();
                throw new Error(errorMessage);
            }
        });
    };

    function onToggleAssignCheckbox(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        if (!formRef.current) return;

        const { setFieldValue, values } = formRef.current;

        setFieldValue("status", checked ? TaskStatuses.IN_PROGRESS : TaskStatuses.TODO);
        if (!values.deadlineAt) setFieldValue("deadlineAt", moment().add(1, "day").toISOString());
        if (!values.assigneeId) setFieldValue("assigneeId", user.id);
    }

    return (
        <FormBase validationSchema={validationSchema} onSubmit={onSubmit} initialValues={initialValues} onClose={onClose} ref={formRef}>
            {({ values }: FormikProps<Partial<TaskFormValues>>) => {
                const isAssigned = values.status === TaskStatuses.IN_PROGRESS;
                return (
                    <>
                        <TextField fieldKey="description" type="multiline" />
                        <TextField fieldKey="additionalInformation" label="Additional Info (Optional)" type="multiline" />
                        <Box marginBottom="-15px" paddingTop="10px">
                            <Checkbox
                                label="Set assignee & deadline"
                                checked={isAssigned}
                                onChange={onToggleAssignCheckbox}
                                // if task was already started - cannot go back
                                disabled={editedTask?.status === TaskStatuses.IN_PROGRESS}
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
