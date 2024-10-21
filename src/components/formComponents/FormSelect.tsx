import React, { useEffect, useState } from "react"; // Import useEffect and useState
import { useTheme } from "@chakra-ui/react";
import FormWrapper from "./FormWrapper"; // Corrected name
import { IFormInputProps } from "@src/interface/forms";
import ReactSelect, { Props } from "react-select";

interface IFormSelectProps
  extends Omit<IFormInputProps, "inputProps" | "type" | "onChange" | "onBlur"> {
  options: { label: string; value: string }[];
  selectProps?: Props;
  onChange?: (name: string, value: string | undefined) => void; // Enhanced typing
  onBlur?: (name: string, isTouched: boolean) => void; // Enhanced typing
}

const FormSelect: React.FC<IFormSelectProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  selectProps = {},
  children,
  helperText,
  wrapperProps = {},
  options,
}) => {
  const theme = useTheme();
  const [isMounted, setIsMounted] = useState(false); // Add state to track mount status

  useEffect(() => {
    setIsMounted(true); // Set mounted to true on component mount
  }, []);

  const handleChange = (selectedOption: { value: string }) => {
    onChange && onChange(name, selectedOption?.value);
  };

  const handleBlur = () => {
    onBlur && onBlur(name, true);
  };

  if (!isMounted) {
    return null; // Prevent rendering until mounted
  }

  return (
    <FormWrapper
      isInvalid={Boolean(error && touched)}
      wrapperProps={wrapperProps}
      helperText={helperText}
      label={label}
      error={error as string}
      touched={touched}
    >
      <ReactSelect
        name={name}
        placeholder={placeholder}
        value={options.find((item) => item.value === value)}
        onChange={handleChange}
        onBlur={handleBlur}
        options={options}
        styles={{
          container: (base) => ({
            ...base,
            width: "100%",
            minWidth: "none",
          }),
          control: (base, { isFocused }) => ({
            ...base,
            border: isFocused
              ? `1px solid ${theme.colors.primary}`
              : error
              ? `1px solid ${theme.colors.errorRed}`
              : "1px solid #c0bcd7",
            backgroundColor: theme.colors.inputBg,
            borderRadius: "10px",
            height: "45px",
          }),
          valueContainer: (base) => ({
            ...base,
            paddingLeft: "20px",
          }),
          option: (base) => ({
            ...base,
            fontSize: ".875rem",
            fontWeight: "500",
          }),
        }}
        {...selectProps}
      />
      {children}
    </FormWrapper>
  );
};

export default FormSelect;
