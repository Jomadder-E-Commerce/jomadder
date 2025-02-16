// formSubmitHandler.js
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FacebookAuthProvider, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '@/firebase/friebase.config';

const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();


export const handleFormSubmit = async ({
    data,
    action,
    setLoading,
    onSuccess,
    onFailure,
    reset,
}) => {
    const toastId = toast.loading('Processing...');
    setLoading(true);

    try {
        const response = await action(data);

        if (response?.data?.success) {
            toast.update(toastId, {
                render: 'Successful!',
                type: 'success',
                isLoading: false,
                autoClose: 3000,
            });
            onSuccess(response);
            reset();
        } else {
            toast.update(toastId, {
                render: response?.error?.data?.message || 'Failed!',
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
            onFailure && onFailure(response);
        }
    } catch (err) {
        toast.dismiss(toastId);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message || 'Something went wrong!',
        });
    } finally {
        setLoading(false);
    }
};

export const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    const token = await user.getIdToken()
    return { token, user }
}

export const handleFacebookLogin = async () => {
    const result = await signInWithPopup(auth, facebookProvider)
    const user = result.user
    const token = await user.getIdToken()
    return { token, user }
}
