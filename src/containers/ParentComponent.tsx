import React, { useState } from "react";
import RequisitionDetailsForm from "./RequisitionDetailsForm";
import PreviewCard from "./PreviewCard";
import { IRequisitionDetails } from "../../interface/forms";
import { Box } from "@chakra-ui/react";

const ParentComponent: React.FC = () => {
  const [formValues, setFormValues] = useState<IRequisitionDetails>({
    requisitionTitle: "",
    noOfOpenings: "",
    urgency: "",
    gender: "",
  });

  const handleFormChange = (values: IRequisitionDetails) => {
    setFormValues(values); // Update the state with the form values
  };

  const handleTab = (n: number) => {
    console.log("Changing to tab:", n);
  };

  return (
    <Box>
      <RequisitionDetailsForm handleTab={handleTab} onFormChange={handleFormChange} />
      <PreviewCard requisitionDetails={formValues} />
    </Box>
  );
};

export default ParentComponent;
