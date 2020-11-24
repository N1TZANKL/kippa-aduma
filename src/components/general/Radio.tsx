import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiRadio, { RadioProps } from "@material-ui/core/Radio";
import FormControlLabel, { FormControlLabelProps } from "@material-ui/core/FormControlLabel";
import SvgIcon from "@material-ui/core/SvgIcon";
import DefaultIcon from "@material-ui/icons/RadioButtonUncheckedTwoTone";
import CheckedIcon from "@material-ui/icons/RadioButtonCheckedTwoTone";

import { MuiStyles } from "src/utils/interfaces";

const styles = () => ({
    formControl: { width: "fit-content" },
    icon: { fontSize: 20 },
    bigIcon: { fontSize: 24 },
    bigRadioLabel: { fontSize: 20 },
});

type CustomRadioProps = MuiStyles &
    RadioProps & {
        label: string;
        formControlLabelProps?: FormControlLabelProps;
        big?: boolean;
    };

function Radio(props: CustomRadioProps) {
    const { classes, label, formControlLabelProps = {} as FormControlLabelProps, big, ...otherProps } = props;

    return (
        <FormControlLabel
            {...formControlLabelProps}
            className={classes.formControl}
            classes={big ? { label: classes.bigRadioLabel } : undefined}
            label={label}
            control={
                <MuiRadio
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

export default withStyles(styles)(Radio);
