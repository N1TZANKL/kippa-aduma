import { useState } from "react";

export function usePopoverState() {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    return [anchorEl, (e: React.MouseEvent) => setAnchorEl(e.currentTarget), () => setAnchorEl(null)] as const;
}

export function useFormState() {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);

    function _clearMessages() {
        setSuccessMessage("");
        setErrorMessage("");
    }

    return [errorMessage, setErrorMessage, successMessage, setSuccessMessage, isLoading, setLoading, _clearMessages] as const;
}
