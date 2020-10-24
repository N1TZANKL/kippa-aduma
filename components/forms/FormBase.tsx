import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Children, MuiStyles } from 'interfaces';
import { Form, Formik } from 'formik';
import { ObjectSchema } from 'yup';
import SubmitButton from 'components/forms/SubmitButton';
import { spaceChildren } from 'utils/helpers/css';

const styles = () => createStyles({
    formRoot: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ...spaceChildren("vertically", 12)
    }
});

type FormBaseProps = MuiStyles & { initialValues: Object, validationSchema: ObjectSchema, onSubmit: (values: Object) => void; children: Children };
function FormBase({ classes, initialValues, validationSchema, onSubmit, children }: FormBaseProps) {

    return <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(values);
        setSubmitting(false);
    }}>
        {(formikProps) => <Form className={classes.formRoot}>
            {children}
            <SubmitButton isSubmitting={formikProps.isSubmitting} />
            {/* add error message here or something */}
        </Form>}
    </Formik>;
}

export default withStyles(styles)(FormBase);