import React from "react";

type MediaRendererProps = { blobPath: string };

export default function MediaRenderer({ blobPath }: MediaRendererProps): JSX.Element {
    return (
        <video controls>
            <source src={blobPath} type={"video/mp4"} />
        </video>
    );
}
