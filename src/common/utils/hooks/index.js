import {useState} from "react";

export function usePopoverState() {
    const [anchorEl, setAnchorEl] = useState(null);
    return [anchorEl, e => setAnchorEl(e.currentTarget), () => setAnchorEl(null)];
}

export function useFormState() {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);

    function _clearMessages() {
        setSuccessMessage("");
        setErrorMessage("");
    }

    return [errorMessage, setErrorMessage, successMessage, setSuccessMessage, isLoading, setLoading, _clearMessages];
}