import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiCheckbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import FormControlLabel, { FormControlLabelProps } from "@material-ui/core/FormControlLabel";
import SvgIcon from "@material-ui/core/SvgIcon";
import DefaultIcon from "@material-ui/icons/CheckBoxOutlineBlankTwoTone";
import CheckedIcon from "@material-ui/icons/CheckBoxTwoTone";
import { Children, MuiStyles } from "interfaces";

const styles = () => ({
    formControl: { width: "fit-content" },
    icon: { fontSize: 20 },
    bigIcon: { fontSize: 24 },
    bigCheckboxLabel: { fontSize: 20 },
});

type CustomCheckboxProps = MuiStyles &
    CheckboxProps & {
        label: Children;
        formControlLabelProps?: Omit<FormControlLabelProps, "control" | "label">;
        big?: boolean;
    };

function Checkbox(props: CustomCheckboxProps) {
    const { classes, label, formControlLabelProps = {} as FormControlLabelProps, big, ...otherProps } = props;

    return (
        <FormControlLabel
            {...formControlLabelProps}
            className={classes.formControl}
            classes={big ? { label: classes.bigCheckboxLabel } : undefined}
            label={label}
            control={
                <MuiCheckbox
                    color="secondary"
                    {...otherProps}
                    icon={<SvgIcon children={<DefaultIcon />} className={big ? classes.bigIcon : classes.icon} />}
                    checkedIcon={<SvgIcon children={<CheckedIcon />} className={big ? classes.bigIcon : classes.icon} />}
                />
            }
        />
    );
}

export default withStyles(styles)(Checkbox);
