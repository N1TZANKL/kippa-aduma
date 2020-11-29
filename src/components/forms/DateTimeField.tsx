import React from "react";
import { useField } from "formik";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from "@material-ui/pickers";
import { WithPureInputProps } from "@material-ui/pickers/Picker/makePickerWithState";
import InputLabel from "@material-ui/core/InputLabel";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { MuiStyles } from "src/utils/interfaces";
import { notFirstChild, spaceChildren } from "src/utils/helpers/css";

moment.locale("en");

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            alignItems: "center",
            marginTop: "20px !important",
        },
        fieldHidden: {
            display: "block",
        },
        label: {
            fontSize: 13,
            lineHeight: 1.25,
            width: "min-content",
            minWidth: 90,
        },
        fields: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
        },
        spaceFields: {
            "& > *": {
                marginLeft: 10,
            },
        },
        "@global": {
            // both pickers overrides
            ".MuiPickersBasePicker-pickerView": {
                backgroundColor: theme.constants.appBackground,
            },
            // date picker overrides
            ".MuiPickersCalendarHeader-iconButton": {
                backgroundColor: "transparent",
                padding: 4,
                margin: "0 15px",
            },
            // time picker overrides
            ".MuiPickersToolbar-toolbar": {
                backgroundColor: theme.constants.appBackground,
                padding: 0,
                height: "fit-content",
            },
            ".MuiTypography-h2": {
                fontSize: 36,
            },
            ".MuiPickersTimePickerToolbar-ampmSelection": {
                flexDirection: "row",
                ...spaceChildren("horizontally", 10),
                "& > *": {
                    borderRadius: 0,
                    padding: "3px 8px",
                },
                ...notFirstChild({
                    borderLeft: "2px solid rgba(255,255,255,0.5)",
                }),
            },
            ".MuiPickersClock-container": {
                margin: 0,
            },
            ".MuiPickersClock-clock": {
                backgroundColor: theme.constants.appBackgroundHighlight,
            },
            ".MuiPickersToolbarButton-toolbarBtn": {
                borderRadius: 0,
            },
        },
    });

type FormikDateTimeProps = MuiStyles & { fieldKey: string; label: string; hide?: "date" | "time"; disabled?: boolean };
function FormikDateTime({ classes, fieldKey, label, hide, disabled }: FormikDateTimeProps) {
    const [field /* meta */, , { setValue }] = useField(fieldKey);

    const fieldProps: Partial<WithPureInputProps> = { disabled, color: "secondary", variant: "inline", fullWidth: true };

    // when there's no value, show a placeholder
    if (!field.value) fieldProps.labelFunc = () => "(Select)";

    return (
        <div className={clsx(classes.root, hide && classes.fieldHidden)}>
            <InputLabel className={classes.label}>{label}</InputLabel>
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                <div className={clsx(classes.fields, !hide && classes.spaceFields)}>
                    {hide !== "date" && (
                        <DatePicker
                            {...fieldProps}
                            name={`${field.name}_date`}
                            id={`${field.name}_date`}
                            disableToolbar
                            disableFuture
                            value={field.value}
                            onChange={(newDate) => setValue(newDate?.toISOString())}
                        />
                    )}

                    {hide !== "time" && (
                        <TimePicker
                            {...fieldProps}
                            name={`${field.name}_time`}
                            id={`${field.name}_time`}
                            value={field.value}
                            onChange={(newDate) => setValue(newDate)}
                        />
                    )}
                </div>
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default withStyles(styles)(FormikDateTime);
