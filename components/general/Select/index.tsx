import React from "react";
import MuiSelect, { SelectProps } from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

type SelectionListItem = {
    label: string;
    value: any;
    disabled?: boolean;
};

type CustomSelectProps = SelectProps & {
    selectionList: Array<SelectionListItem>;
    label?: string;
    helperText?: string;
    errorMessage?: string;
};

export default function Select(props: CustomSelectProps) {
    const { selectionList, label, helperText, errorMessage, value, ...otherProps } = props;

    return (
        <FormControl fullWidth>
            <InputLabel shrink={!!label} children={label} />
            <MuiSelect
                {...otherProps}
                color="secondary"
                value={value || ""}
                displayEmpty
                renderValue={(val) => (val ? selectionList.find((item: SelectionListItem) => item.value === val)?.label : "(Select)")}
            >
                {selectionList.map((item: SelectionListItem) => (
                    <MenuItem key={JSON.stringify(item.value)} value={item.value} children={item.label} disabled={item.disabled} />
                ))}
            </MuiSelect>
            {helperText ||
                (errorMessage && (
                    <FormHelperText error={!!errorMessage} component="legend" style={{ marginTop: -5, marginBottom: 3 }}>
                        {errorMessage || helperText}
                    </FormHelperText>
                ))}
        </FormControl>
    );
}
