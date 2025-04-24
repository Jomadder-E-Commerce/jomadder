import Select from "react-select";
export default function SearchSelect({
  options,
  placeholder,
  onValueChange,
  value,
  disabled,
  key
}) {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "48px", // Adjust the height of the select input
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 16px", // Adjust the padding inside the select input
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px", // Remove margin inside the input
    }),
    indicatorSeparator: () => ({
      display: "none", // Hide the separator
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "8px", // Adjust the padding for the dropdown indicator
    }),
  };
  
  return (
    <Select
      options={options || []}
      placeholder={placeholder}
      classNamePrefix="select"
      styles={customStyles}
      onChange={onValueChange}
      value={value?.value || value?.label ? value : ""}
      isDisabled={disabled}
      key={key}
    />
  );
}
