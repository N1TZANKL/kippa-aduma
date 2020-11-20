import React from "react";
import MuiSelect, { SelectProps as MuiSelectProps } from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Box from "@material-ui/core/Box";

import { firstLetterUppercase } from "utils/helpers/strings";

type SelectionListItem = {
    label: string;
    value: unknown;
    disabled?: boolean;
};

export type SelectProps = MuiSelectProps & {
    selectionList: Array<SelectionListItem>;
    label?: string;
    helperText?: string;
    errorMessage?: string;
};

export const ArrayToSelectionList = (array: string[]): SelectionListItem[] => array.map((s) => ({ label: firstLetterUppercase(s), value: s }));

export default function Select(props: SelectProps): JSX.Element {
    const { selectionList, label, helperText, errorMessage, value, className, ...otherProps } = props;

    return (
        <FormControl fullWidth className={className}>
            <InputLabel shrink={!!label} error={!!errorMessage}>
                {label}
            </InputLabel>
            <MuiSelect
                {...otherProps}
                color="secondary"
                value={value || ""}
                displayEmpty
                error={!!errorMessage}
                renderValue={(val) => (val ? selectionList.find((item: SelectionListItem) => item.value === val)?.label : "(Select)")}
            >
                {selectionList.map((item: SelectionListItem) => (
                    <MenuItem key={JSON.stringify(item.value)} value={item.value} disabled={item.disabled}>
                        {item.label}
                    </MenuItem>
                ))}
            </MuiSelect>
            {errorMessage || helperText ? (
                <Box marginBottom="3px" clone>
                    <FormHelperText error={!!errorMessage} component="legend">
                        {errorMessage || helperText}
                    </FormHelperText>
                </Box>
            ) : null}
        </FormControl>
    );
}
