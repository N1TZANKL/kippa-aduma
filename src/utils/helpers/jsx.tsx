import React from "react";

export function repeatElement(element: JSX.Element, count: number): JSX.Element[] {
    return new Array(count).fill(null).map((_, index) => React.cloneElement(element, { key: index }));
}
