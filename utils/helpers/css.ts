import { CSSProperties } from "@material-ui/styles";

export const textEllipsis: CSSProperties = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
};

export function before(text: string, otherAttributes: CSSProperties = {}): CSSProperties {
    return {
        "&::before": {
            content: `"${text}"`,
            ...otherAttributes,
        },
    };
}

export function after(text: string, otherAttributes: CSSProperties = {}): CSSProperties {
    return {
        "&::after": {
            ...otherAttributes,
            content: `"${text}"`,
        },
    };
}

export function notLastChild(attributes: CSSProperties = {}): CSSProperties {
    return { "& > *:not(:last-child)": attributes };
}

export function notFirstChild(attributes: CSSProperties = {}): CSSProperties {
    return { "& > *:not(:first-child)": attributes };
}

export function spaceChildren(direction: "vertically" | "horizontally", spaceMargin: number): CSSProperties {
    const marginAttribute = direction === "vertically" ? "marginTop" : "marginLeft";
    return notFirstChild({ [marginAttribute]: spaceMargin });
}
