import React, { useState } from "react";
import { FileManager as OrigFileManager, FileNavigator } from "@opuscapita/react-filemanager";
import connectorNodeV1 from "@opuscapita/react-filemanager-connector-node-v1";
import { mdiFileEye } from "@mdi/js";
import FilePreviewDialog from "src/components/dialogs/FilePreviewDialog";

const CUSTOM_FILE_VIEWER_CAPABILITY = {
    id: "view-file-button",
    icon: {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" focusable="false"><path d="${mdiFileEye}" /></circle></svg>`,
    },
    label: "Preview file",
    availableInContexts: ["row", "toolbar"],
};

const unpatchedCapabilities = ["sort", "download"];

export default function FileManager() {
    const [previewedFile, setPreviewedFile] = useState("");

    const apiOptions = {
        ...connectorNodeV1.apiOptions,
        apiRoot: `http://localhost:${process.env.STORAGE_PORT}`,
    };

    function onDoubleClickItem({ rowData }) {
        if (rowData.type !== "file") return;
        const relativePath = ["", ...rowData.ancestors.map((a) => a.name).slice(1), rowData.name].join("/");
        setPreviewedFile(relativePath);
    }

    return (
        <>
            <OrigFileManager>
                <FileNavigator
                    id="filemanager-1"
                    api={connectorNodeV1.api}
                    apiOptions={apiOptions}
                    capabilities={(apiOptions, actions) => {
                        const basicCapabilities = connectorNodeV1.capabilities(apiOptions, actions);
                        let patchedCapabilities = [];

                        // This next piece of code makes it impossible UI-wise to make any changes to the
                        // post-attachments directory, making it read-only. The only capabilities that should
                        // work are file download/preview.
                        for (const capability of basicCapabilities) {
                            if (unpatchedCapabilities.includes(capability.id)) patchedCapabilities.push(capability);
                            else
                                patchedCapabilities.push({
                                    ...capability,
                                    shouldBeAvailable: () => {
                                        const selected = actions.getSelectedResources();
                                        if (selected.length === 0) {
                                            if (actions.getResource().name !== "post-attachments") return capability.shouldBeAvailable();
                                            return false;
                                        }
                                        if (
                                            !selected.some(
                                                (s) =>
                                                    s.name === "post-attachments" || s.ancestors[s.ancestors.length - 1].name === "post-attachments"
                                            )
                                        )
                                            return capability.shouldBeAvailable();
                                        return false;
                                    },
                                });
                        }

                        return [
                            ...patchedCapabilities,
                            {
                                ...CUSTOM_FILE_VIEWER_CAPABILITY,
                                handler: () => {
                                    const selected = actions.getSelectedResources();
                                    if (selected.length !== 1) return;
                                    onDoubleClickItem({ rowData: selected[0] });
                                },
                                shouldBeAvailable: () => {
                                    const selected = actions.getSelectedResources();
                                    return selected.length === 1 && selected[0].type === "file";
                                },
                            },
                        ];
                    }}
                    listViewLayout={connectorNodeV1.listViewLayout}
                    viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
                    onResourceItemDoubleClick={onDoubleClickItem}
                />
            </OrigFileManager>
            <FilePreviewDialog onClose={() => setPreviewedFile("")} filePath={previewedFile} />
        </>
    );
}
