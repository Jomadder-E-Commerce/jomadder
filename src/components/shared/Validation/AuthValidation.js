import * as Yup from 'yup';

export const validationSchemaLogin = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const validationSchemaResistor = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    image: Yup.mixed().test('fileRequired', 'Image is required', (value) => {
        return value && value.length > 0;
    }),
    name: Yup.string().required('Name is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const validationSchemaChangePassword = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});