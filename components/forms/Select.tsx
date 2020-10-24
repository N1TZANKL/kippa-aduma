import React from 'react';
import Select, { SelectProps } from "components/general/Select";
import { useField } from "formik";
import { firstLetterUppercase } from 'utils/helpers/strings';
import { createStyles, withStyles } from '@material-ui/styles';
import { MuiStyles } from 'interfaces';

const styles = () => createStyles({
    select: {
        marginTop: "20px !important"
    }
});

type FormikSelectProps = MuiStyles & SelectProps & { fieldKey: string };
function FormikSelect({ classes, fieldKey, label, ...props }: FormikSelectProps) {

    const [field, meta] = useField(fieldKey);


    return <Select
        id={field.name}
        name={field.name}
        value={field.value}
        label={label || firstLetterUppercase(field.name)}
        onChange={field.onChange}
        errorMessage={(meta.touched && meta.error) || ""}
        className={classes.select}
        {...props}
    />
}

export default withStyles(styles)(FormikSelect);
