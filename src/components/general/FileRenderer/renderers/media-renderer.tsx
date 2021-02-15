import React from "react";

type MediaRendererProps = { blobPath: string };

export default function MediaRenderer({ blobPath }: MediaRendererProps) {
    return (
        <video controls>
            <source src={blobPath} type={"video/mp4"} />
        </video>
    );
}
