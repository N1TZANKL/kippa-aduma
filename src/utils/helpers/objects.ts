export function filterDuplicatesFromArray<T>(array: T[]): T[] {
    return [...new Set(array)];
}
