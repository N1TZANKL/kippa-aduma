import React from 'react';
import * as Yup from "yup";
import { OperationPostTypes } from "db/models/post";
import { ArrayToSelectionList } from 'components/general/Select';
import { FormBase, TextField, DateTimeField, Select } from 'components/forms';

const validationSchema = Yup.object({
    title: Yup.string(),
    description: Yup.string().required("Required"),
    type: Yup.string().oneOf(Object.values(OperationPostTypes)).default(OperationPostTypes.UPDATE).required("Required"),
    additionalInformation: Yup.string(),
    happenedAt: Yup.date().required("Required")
})

type CreatePostFormProps = { addPost: Function; onClose?: Function };
export default function CreatePostForm({ addPost, onClose }: CreatePostFormProps) {

    function onSubmit(formData: Object, setFormError: Function) {
        return fetch("/api/post/postPost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }).then(async res => {
            if (res.ok) {
                res.json().then(newPost => addPost(newPost));
                if (onClose) onClose();
            }
            else setFormError(await res.text());
        }).catch(e => setFormError(e.message));
    }

    return <FormBase validationSchema={validationSchema}
        onSubmit={onSubmit}
        initialValues={{ type: OperationPostTypes.UPDATE, happenedAt: new Date().toISOString(), description: "" }}>
        {() => <>
            <TextField fieldKey="title" label="Title (Optional)" />
            <TextField fieldKey="description" type="multiline" />
            <TextField fieldKey="additionalInformation" label="Additional Info (Optional)" type="multiline" />
            <Select fieldKey="type" selectionList={ArrayToSelectionList(Object.values(OperationPostTypes))} />
            <DateTimeField fieldKey="happenedAt" />
        </>}
    </FormBase>;
}