import React from "react";
import * as Yup from "yup";

import { OperationPostTypes } from "db/post/model";
import { ArrayToSelectionList } from "src/components/general/Select";
import { FormBase, TextField, DateTimeField, Select } from "src/components/forms";
import { OperationPost } from "interfaces";
import { Post } from "utils/helpers/api";
import { FormBaseOnSubmit } from "src/components/forms/FormBase";

const validationSchema = Yup.object({
    title: Yup.string(),
    description: Yup.string().required("Required"),
    type: Yup.string().oneOf(Object.values(OperationPostTypes)).default(OperationPostTypes.UPDATE).required("Required"),
    additionalInformation: Yup.string(),
    happenedAt: Yup.date().required("Required"),
});

type CreatePostFormProps = { addPost: (newPost: OperationPost) => void; onClose?: () => void };

export default function CreatePostForm({ addPost, onClose }: CreatePostFormProps): JSX.Element {
    const initialValues = { type: OperationPostTypes.UPDATE, happenedAt: new Date().toISOString(), description: "" };

    const onSubmit: FormBaseOnSubmit = (formData) =>
        Post("post", formData).then(async (res) => {
            if (res.ok) res.json().then((newPost) => addPost(newPost));
            else {
                const errorMessage = await res.text();
                throw new Error(errorMessage);
            }
        });

    return (
        <FormBase validationSchema={validationSchema} onSubmit={onSubmit} initialValues={initialValues} onClose={onClose}>
            {() => (
                <>
                    <TextField fieldKey="title" label="Title (Optional)" />
                    <TextField fieldKey="description" type="multiline" />
                    <TextField fieldKey="additionalInformation" label="Additional Info (Optional)" type="multiline" />
                    <Select fieldKey="type" selectionList={ArrayToSelectionList(Object.values(OperationPostTypes))} />
                    <DateTimeField fieldKey="happenedAt" />
                </>
            )}
        </FormBase>
    );
}
