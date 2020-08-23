export const hex2rgb = hex => [("0x" + hex[1] + hex[2]) | 0, ("0x" + hex[3] + hex[4]) | 0, ("0x" + hex[5] + hex[6]) | 0 ].join();

export function hexToRgba(color, opacity = 1) {
    const bigint = parseInt(color.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r},${g},${b},${opacity})`;
}

export function sleep(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

export function refreshPage() {
    window.location.reload()
}

export function refreshPageWithDelay(ms) {
    setTimeout(refreshPage, ms)
}

// Requires Chrome v66+ / Firefox v63+ / Edge v79+
export function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

export function isElementEllipsisActive(el) {
    return el.offsetWidth < e.scrollWidth;
}
