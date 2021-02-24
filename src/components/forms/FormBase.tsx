import React, { MutableRefObject, useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import { ObjectSchema } from "yup";

import { MuiStyles } from "src/utils/interfaces";
import { spaceChildren } from "src/utils/helpers/css";

import { FormError, FormSuccess } from "./FormText";
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

export type FormBaseOnSubmit = (values: FormikValues) => Promise<void>;

type FormBaseProps = MuiStyles & {
    initialValues: FormikValues;
    validationSchema: ObjectSchema;
    onSubmit: FormBaseOnSubmit;
    children: (formikProps: FormikProps<FormikValues>) => React.ReactChild;
    onClose?: () => void;
};

type FormRef = MutableRefObject<FormikProps<any> | null> | ((instance: FormikProps<any> | null) => void) | null;

function FormBase({ classes, initialValues, validationSchema, onSubmit, children, onClose }: FormBaseProps, ref: FormRef) {
    const [formError, setFormError] = useState<string>("");
    const [formSuccess, setFormSuccess] = useState<string>("");

    async function onSubmitForm(values: FormikValues, { setSubmitting, resetForm }: FormikHelpers<FormikValues>) {
        setFormError("");
        setFormSuccess("");

        try {
            await onSubmit(values);
            if (onClose) {
                onClose();
                return;
            }
            resetForm();
            setFormSuccess("Action completed successfully!");
        } catch (e) {
            setFormError(e.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitForm} innerRef={ref}>
            {(formikProps) => (
                <Form className={classes.formRoot}>
                    {children(formikProps)}
                    <SubmitButton isSubmitting={formikProps.isSubmitting} />
                    {formError ? <FormError>{formError}</FormError> : null}
                    {formSuccess ? <FormSuccess>{formSuccess}</FormSuccess> : null}
                </Form>
            )}
        </Formik>
    );
}

export default withStyles(styles)(React.forwardRef(FormBase));
