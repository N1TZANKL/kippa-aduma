import React from "react";
import MuiSelect, { SelectProps as MuiSelectProps } from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { firstLetterUppercase } from "utils/helpers/strings";

type SelectionListItem = {
    label: string;
    value: any;
    disabled?: boolean;
};

export type SelectProps = MuiSelectProps & {
    selectionList: Array<SelectionListItem>;
    label?: string;
    helperText?: string;
    errorMessage?: string;
};

export const ArrayToSelectionList = (array: string[]) => array.map((s) => ({ label: firstLetterUppercase(s), value: s }));

export default function Select(props: SelectProps) {
    const { selectionList, label, helperText, errorMessage, value, className, ...otherProps } = props;

    return (
        <FormControl fullWidth className={className}>
            <InputLabel shrink={!!label} children={label} error={!!errorMessage} />
            <MuiSelect
                {...otherProps}
                color="secondary"
                value={value || ""}
                displayEmpty
                error={!!errorMessage}
                renderValue={(val) => (val ? selectionList.find((item: SelectionListItem) => item.value === val)?.label : "(Select)")}
            >
                {selectionList.map((item: SelectionListItem) => (
                    <MenuItem key={JSON.stringify(item.value)} value={item.value} children={item.label} disabled={item.disabled} />
                ))}
            </MuiSelect>
            {helperText ||
                (errorMessage && (
                    <FormHelperText error={!!errorMessage} component="legend" style={{ marginBottom: 3 }}>
                        {errorMessage || helperText}
                    </FormHelperText>
                ))}
        </FormControl>
    );
}
