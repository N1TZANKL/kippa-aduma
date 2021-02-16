import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import connectorNodeV1 from "@opuscapita/react-filemanager-connector-node-v1";

import { OperationPostTypes } from "server/db/post/model";
import { ArrayToSelectionList } from "src/components/general/Select";
import { FormBase, TextField, DateTimeField, Select } from "src/components/forms";
import { OperationPost } from "src/utils/interfaces";
import { Post } from "src/utils/helpers/api";
import { FormBaseOnSubmit } from "src/components/forms/FormBase";
import FileUploadField from "src/components/forms/FileUploadField";

const storageApiOptions = { apiRoot: `http://${process.env.HOST}:${process.env.STORAGE_PORT}` };

const validationSchema = Yup.object({
    title: Yup.string(),
    description: Yup.string().required("Required"),
    type: Yup.string().oneOf(Object.values(OperationPostTypes)).default(OperationPostTypes.UPDATE).required("Required"),
    additionalInformation: Yup.string(),
    happenedAt: Yup.date().required("Required"),
    attachments: Yup.mixed(),
});

type CreatePostFormProps = { onSubmitSuccess?: (newPost: OperationPost) => void; onClose?: () => void };

export default function CreatePostForm({ onSubmitSuccess, onClose }: CreatePostFormProps): JSX.Element {
    const [attachmentsFolderId, setAttachmentsFolderId] = useState("");

    useEffect(() => {
        connectorNodeV1.api.getIdForPath(storageApiOptions, "/post-attachments").then((id: string) => setAttachmentsFolderId(id));
    }, []);

    const initialValues = { type: OperationPostTypes.UPDATE, happenedAt: new Date().toISOString(), description: "", attachments: [] };

    async function uploadAttachmentsToStorage(attachments: File[], postId: string) {
        if (attachments.length === 0) return;

        try {
            // IMPORTANT NOTE: This code depends heavily on the API of the library @opuscapita/filemanager,
            // and could break if it changes.

            if (!attachmentsFolderId) throw new Error("Could not fetch ID of attachments folder in storage");

            const res = await connectorNodeV1.api.createFolder(storageApiOptions, attachmentsFolderId, postId);
            const newFolderId = res.body.id;

            const promises = attachments.map((file) =>
                connectorNodeV1.api.uploadFileToId({
                    apiOptions: storageApiOptions,
                    onProgress: () => {},
                    file: { type: file.type, name: file.name, file },
                    parentId: newFolderId,
                })
            );
            await Promise.all(promises);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);

            // show snackbar?
        }
    }

    const onSubmit: FormBaseOnSubmit = async ({ attachments, ...formData }) => {
        const res = await Post("post", formData);

        if (res.ok) {
            const newPost: OperationPost = await res.json();
            uploadAttachmentsToStorage(Array.from(attachments), newPost.id);
            if (onSubmitSuccess) {
                onSubmitSuccess(newPost);
            }
        } else {
            const errorMessage = await res.text();
            throw new Error(errorMessage);
        }
    };

    return (
        <FormBase validationSchema={validationSchema} onSubmit={onSubmit} initialValues={initialValues} onClose={onClose}>
            {() => (
                <>
                    <TextField fieldKey="title" label="Title (Optional)" />
                    <TextField fieldKey="description" type="multiline" />
                    <TextField fieldKey="additionalInformation" label="Additional Info (Optional)" type="multiline" />
                    <Select fieldKey="type" selectionList={ArrayToSelectionList(Object.values(OperationPostTypes))} />
                    <DateTimeField fieldKey="happenedAt" label="Date & Time Happened" datePickerProps={{ disableFuture: true }} />
                    <FileUploadField fieldKey="attachments" multiple label="Attachments" />
                </>
            )}
        </FormBase>
    );
}
