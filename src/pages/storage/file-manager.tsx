import React from "react";
import { FileManager as OrigFileManager, FileNavigator } from "@opuscapita/react-filemanager";
import connectorNodeV1 from "@opuscapita/react-filemanager-connector-node-v1";

export default function FileManager() {
    const apiOptions = {
        ...connectorNodeV1.apiOptions,
        apiRoot: `http://localhost:${process.env.STORAGE_PORT}`,
    };

    console.log(apiOptions.apiRoot);

    return (
        <OrigFileManager>
            <FileNavigator
                id="filemanager-1"
                api={connectorNodeV1.api}
                apiOptions={apiOptions}
                capabilities={connectorNodeV1.capabilities}
                listViewLayout={connectorNodeV1.listViewLayout}
                viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
            />
        </OrigFileManager>
    );
}
