import React from "react";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { useField } from "formik";

const styles = createStyles({
    root: {
        display: "flex",
        alignItems: "center",
        marginTop: "20px !important",
    },
    label: {
        fontSize: 13,
        lineHeight: 1.25,
        width: "min-content",
        minWidth: 90,
    },
});

type FileUploadFieldProps = WithStyles<typeof styles> & { fieldKey: string; label: string; multiple?: boolean };

function FileUploadField({ classes, label, fieldKey, multiple }: FileUploadFieldProps) {
    const [, , { setValue }] = useField(fieldKey);

    return (
        <div className={classes.root}>
            <InputLabel className={classes.label}>{label}</InputLabel>
            <input multiple={multiple} type="file" onChange={(e) => setValue(e.currentTarget.files)} />
        </div>
    );
}

export default withStyles(styles)(FileUploadField);
