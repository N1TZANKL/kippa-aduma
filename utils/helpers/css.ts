import { CSSProperties } from "@material-ui/styles";
import * as CSS from "csstype";

export const textEllipsis: CSSProperties = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
};

export function before(text: string, otherAttributes?: Omit<CSS.Pseudos, "content">) {
    return {
        "&::before": {
            content: `"${text}"`,
            ...otherAttributes,
        },
    } as CSSProperties;
}

export function after(text: string, otherAttributes?: Omit<CSS.Pseudos, "content">) {
    return {
        "&::after": {
            content: `"${text}"`,
            ...otherAttributes,
        },
    } as CSSProperties;
}

export function notLastChild(attributes: CSSProperties) {
    return { "& > *:not(:last-child)": attributes } as CSSProperties;
}

export function notFirstChild(attributes: CSSProperties) {
    return { "& > *:not(:first-child)": attributes } as CSSProperties;
}

export function spaceChildren(direction: "vertically" | "horizontally", spaceMargin: number) {
    const marginAttribute = direction === "vertically" ? "marginTop" : "marginLeft";
    return notFirstChild({ [marginAttribute]: spaceMargin });
}

export function flex(column?: boolean, justifyCenter?: boolean, alignCenter?: boolean) {
    return {
        display: "flex",
        flexDirection: column ? "column" : undefined,
        justifyContent: justifyCenter ? "center" : undefined,
        alignItems: alignCenter ? "center" : undefined,
    } as CSSProperties;
}
