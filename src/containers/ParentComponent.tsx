import React, { useState } from "react";
import RequisitionDetailsForm from "./home/RequisitionDetailsForm";
import PreviewCard from "./home/PreviewCard";
import { IRequisitionDetails } from "../interface/forms";
import { Box } from "@chakra-ui/react";

const ParentComponent: React.FC = () => {
  const [formValues, setFormValues] = useState<IRequisitionDetails>({
    requisitionTitle: "",
    noOfOpenings: 0,
    urgency: "",
    gender: "",
  });

  const handleFormChange = (values: IRequisitionDetails) => {
    console.log("Form Values Updating:", values); // Track real-time updates
    setFormValues((prevValues) => ({
      ...prevValues,
      ...values, // Ensure all form values are kept in sync
    }));
  };

  const handleTab = (n: number) => {
    console.log("Changing to tab:", n);
  };

  console.log("Form Values in ParentComponent:", formValues); // Ensure formValues are updating

  return (
    <Box>
      <RequisitionDetailsForm handleTab={handleTab} onFormChange={handleFormChange} />
      <PreviewCard requisitionDetails={formValues} />
    </Box>
  );
};

export default ParentComponent;
