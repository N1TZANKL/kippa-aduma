import React, { useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { Form, Formik, FormikProps } from "formik";
import { ObjectSchema } from "yup";

import { MuiStyles, GenericObject, SetState, Children } from "interfaces";
import { spaceChildren } from "utils/helpers/css";

import FormError from "./FormError";
import SubmitButton from "./SubmitButton";

const styles = () =>
    createStyles({
        formRoot: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            ...spaceChildren("vertically", 12),
        },
    });

export type FormProps<T> = FormikProps<T | any>;

type FormBaseProps = MuiStyles & {
    initialValues: GenericObject;
    validationSchema: ObjectSchema;
    onSubmit: (values: GenericObject, setFormError: SetState<string>) => Promise<void>;
    children: (formikProps: FormProps<any>) => Children;
};
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
                    {formError ? <FormError>{formError}</FormError> : null}
                </Form>
            )}
        </Formik>
    );
}

export default withStyles(styles)(FormBase);
