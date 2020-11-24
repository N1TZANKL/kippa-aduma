export function firstLetterUppercase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeFirstLetters(string) {
    return string
        .toLowerCase()
        .split(" ")
        .map((s) => firstLetterUppercase(s))
        .join(" ");
}

export function addSpaceBeforeUppercaseLetter(string) {
    return string.replace(/([A-Z])/g, " $1").trim();
}
