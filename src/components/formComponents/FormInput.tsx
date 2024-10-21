import React from "react";
import { Input } from "@chakra-ui/react";
import FormWrapper from "./FormWrapper";
import { IFormInputProps } from "@src/interface/forms";

const FormInput = React.forwardRef<HTMLInputElement, IFormInputProps>(
  (
    {
      name,
      label,
      placeholder,
      type,
      value,
      onChange,
      onBlur,
      error,
      touched,
      inputProps = {},
      children,
      helperText,
      wrapperProps = {},
    },
    ref
  ) => {
    // Set default input type to "text" if not provided
    const inputType = type || "text"; 

    // Define default styles for input
    const defaultInputStyles = {
      width: "100%",
      maxHeight: "none !important",
      minW: "272px",
      height: "45px",
      fontSize: "0.875rem",
      fontWeight: "500",
      px: "20px",
      border: "1px solid #c0bcd7",
      bg: "inputBg",
      borderRadius: "10px",
      focusBorderColor: "primary",
      errorBorderColor: "errorRed",
      _placeholder: {
        color: "text.placeholder",
      },
    };

    return (
      <FormWrapper
        isInvalid={Boolean(error && touched)}
        wrapperProps={wrapperProps}
        helperText={helperText}
        label={label}
        touched={touched}
        error={error as string}
      >
        <Input
          name={name}
          placeholder={placeholder}
          type={inputType} // Apply default type
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          {...defaultInputStyles} // Default styles applied
          {...inputProps} // Allow external styles to override
        />
        {children}
      </FormWrapper>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
