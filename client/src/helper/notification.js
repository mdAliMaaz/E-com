import { toast } from "react-toastify";

const handleSuccess = (message, success) => {
    if (success) {
        toast.success(message);
    } else {
        toast.error(message);
    }
};

const handleError = (message) => {
    toast.error(message);
};

const handleLoading = (message) => {
    toast.loading(message);
};

export { handleError, handleSuccess, handleLoading }