export const handleFormData = (formRef, event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const formValues = {};

    formData.forEach((value, key) => {
        if (typeof value === 'string' && value.trim()) {
            formValues[key] = value.trim();  // Trim string values and add if not empty
        } else if (value instanceof File && value.size > 0) {
            formValues[key] = value;  // Handle file inputs if not empty
        }
    });

    return formValues;
};
  