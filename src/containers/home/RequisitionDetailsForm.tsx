import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useCallback } from "react";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";

const RequisitionDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
  onFormChange?: (values: IRequisitionDetails) => void; // Made optional
}> = ({ handleTab, onFormChange = () => {} }) => {
  const formik = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: "",
      noOfOpenings: "",
      urgency: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Number of openings must be greater than zero")
        .min(1, "Enter at least one opening"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      console.log("Submitting:", values);
      onFormChange(values); // Pass values to onFormChange
      handleTab(1); // Move to the next page
    },
  });

  // Handler to update form values
  const handleChange = useCallback((field: string, value: any) => {
    formik.setFieldValue(field, value);
    onFormChange({ ...formik.values, [field]: value });
  }, [formik.values, onFormChange]);

  // Call onFormChange whenever form values change
  React.useEffect(() => {
    onFormChange(formik.values);
  }, [formik.values, onFormChange]);

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={(e) => handleChange("requisitionTitle", e.target.value)}
          onBlur={formik.handleBlur}
          value={formik.values.requisitionTitle}
          error={formik.errors.requisitionTitle}
          touched={formik.touched.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          type="number"
          onChange={(e) => handleChange("noOfOpenings", parseFloat(e.target.value) || 0)} // Use parseFloat for number input
          onBlur={formik.handleBlur}
          value={formik.values.noOfOpenings}
          error={formik.errors.noOfOpenings}
          touched={formik.touched.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={(value) => handleChange("gender", value)}
          onBlur={() => formik.setFieldTouched("gender")}
          error={formik.errors.gender}
          touched={formik.touched.gender}
          value={formik.values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={(value) => handleChange("urgency", value)}
          onBlur={() => formik.setFieldTouched("urgency")}
          error={formik.errors.urgency}
          touched={formik.touched.urgency}
          value={formik.values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit" isDisabled={!formik.isValid || formik.isSubmitting}>
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
