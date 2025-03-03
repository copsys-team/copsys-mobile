import { useFormik, FormikValues } from "formik";
import * as yup from "yup";
import { DatabaseService } from "./database/core";

interface FormServiceConfig<T extends FormikValues> {
  initialValues: T;
  validationSchema: yup.ObjectSchema<T>;
  entityName: string;
  dbService: DatabaseService;
  onSuccess?: (values: T) => void;
}

export function useFormService<T extends FormikValues>({
  initialValues,
  validationSchema,
  entityName,
  dbService,
  onSuccess,
}: FormServiceConfig<T>) {
  const formik = useFormik<T>({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        console.log("trying to submit: ", values);
        
        // Save to local database first
        await dbService.executeQuery(
          `INSERT INTO ${entityName} (${Object.keys(values).join(
            ", "
          )}, _status)
             VALUES (${Object.keys(values)
               .map(() => "?")
               .join(", ")}, 'pending')`,
          Object.values(values)
        );

        console.log(`${entityName} data inserted`);
        // Queue for sync
        await dbService.executeQuery(
          `INSERT INTO pending_changes (entity_name, operation, data, created_at)
             VALUES ( ?, ?, ?, ?)`,
          [entityName, "create", JSON.stringify(values), Date.now()]
        );
        console.log(`Registered to pending changes successfully`);
        onSuccess?.(values);
        helpers.resetForm();
      } catch (error) {
        console.error("Form submission failed:", error);
        helpers.setStatus({ submitError: "Failed to save data" });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    isSubmitting: formik.isSubmitting,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    handleSubmit: formik.handleSubmit,
    setFieldTouched: formik.setFieldTouched,
    setFieldValue: formik.setFieldValue,
    setStatus: formik.setStatus,
    validateForm: formik.validateForm,
    isValid: formik.isValid,
    status: formik.status,
  };
}
