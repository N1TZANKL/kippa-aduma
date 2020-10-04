import _ from "lodash";

export function isObjectEmpty(obj) {
    return _.isEmpty(obj);
}

export function getMutableCloneOfUnmutableVariant(val) {
    return JSON.parse(JSON.stringify(val));
}

export function eoi(a, b) {
    return Array.isArray(a) ? a.includes(b) : a === b;
}

export function filterDuplicatesFromArray(array) {
    return [...new Set(array)];
}

export function filterFalsesAndDuplicatesFromArray(array) {
    return [...new Set(array.filter(Boolean))];
}

export function sortObjectArray(array, sortAttribute, reverse = false) {
    const sortedArray = array.sort((a, b) => {
        const attrA = a[sortAttribute];
        const attrB = b[sortAttribute];
        return attrA < attrB ? -1 : attrA > attrB ? 1 : 0;
    });

    return reverse ? sortedArray.reverse() : sortedArray;
}

export function sortObjectArrayAlphabetically(array, sortAttribute) {
    const sortedArray = array.sort((a, b) => {
        const textA = a[sortAttribute].toLowerCase();
        const textB = b[sortAttribute].toLowerCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    return reverse ? sortedArray.reverse() : sortedArray;
}
