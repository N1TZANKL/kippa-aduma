import React, { useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { Children, MuiStyles } from "interfaces";
import { Form, Formik } from "formik";
import { ObjectSchema } from "yup";
import { spaceChildren } from "utils/helpers/css";
import { FormError, SubmitButton } from ".";

const styles = () =>
    createStyles({
        formRoot: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            ...spaceChildren("vertically", 12),
        },
    });

type FormBaseProps = MuiStyles & { initialValues: Object; validationSchema: ObjectSchema; onSubmit: Function; children: Function };
function FormBase({ classes, initialValues, validationSchema, onSubmit, children }: FormBaseProps) {
    const [formError, setFormError] = useState<string>("");

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                setFormError("");
                await onSubmit(values, setFormError);
                setSubmitting(false);
                resetForm();
            }}
        >
            {(formikProps) => (
                <Form className={classes.formRoot}>
                    {children(formikProps)}
                    <SubmitButton isSubmitting={formikProps.isSubmitting} />
                    {formError && <FormError>{formError}</FormError>}
                </Form>
            )}
        </Formik>
    );
}

export default withStyles(styles)(FormBase);
