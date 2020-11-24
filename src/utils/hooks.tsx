import { useState } from "react";

export function usePopoverState(): readonly [Element | null, (e: React.MouseEvent) => void, () => void] {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    return [anchorEl, (e: React.MouseEvent) => setAnchorEl(e.currentTarget), () => setAnchorEl(null)];
}

export function useFormState(): readonly [string, (s: string) => void, string, (s: string) => void, boolean, (b: boolean) => void, () => void] {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);

    function clearMessages() {
        setSuccessMessage("");
        setErrorMessage("");
    }

    return [errorMessage, setErrorMessage, successMessage, setSuccessMessage, isLoading, setLoading, clearMessages];
}
