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

export function hexToRGB(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    else return `rgba(${r}, ${g}, ${b})`;
}

export function isElementOverflowing(el: HTMLElement): boolean {
    if (!el) return false;
    return el.offsetHeight < el.scrollHeight;
}

export function hexToRGB(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    else return `rgba(${r}, ${g}, ${b})`;
}
