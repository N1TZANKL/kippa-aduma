import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiCheckbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import FormControlLabel, { FormControlLabelProps } from "@material-ui/core/FormControlLabel";
import SvgIcon from "@material-ui/core/SvgIcon";
import DefaultIcon from "@material-ui/icons/CheckBoxOutlineBlankTwoTone";
import CheckedIcon from "@material-ui/icons/CheckBoxTwoTone";

import { MuiStyles } from "interfaces";

const styles = () => ({
    formControl: { width: "fit-content" },
    icon: { fontSize: 20 },
    bigIcon: { fontSize: 24 },
    bigCheckboxLabel: { fontSize: 20 },
});

type CustomCheckboxProps = MuiStyles &
    CheckboxProps & {
        label: React.ReactChild;
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
                    icon={
                        <SvgIcon className={big ? classes.bigIcon : classes.icon}>
                            <DefaultIcon />
                        </SvgIcon>
                    }
                    checkedIcon={
                        <SvgIcon className={big ? classes.bigIcon : classes.icon}>
                            <CheckedIcon />
                        </SvgIcon>
                    }
                />
            }
        />
    );
}

export default withStyles(styles)(Checkbox);
