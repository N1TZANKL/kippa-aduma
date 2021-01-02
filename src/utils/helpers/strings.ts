export function firstLetterUppercase(string: string): string {
    return string[0].toUpperCase() + string.slice(1);
}

export function replaceLineBreaksWithSymbol(string: string): string {
    return string.replace(/\n/g, " ↵ ");
}
