import { useState } from "react";

const useNotification = () => {
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
        isVisible: boolean;
    }>({
        message: '',
        type: 'info',
        isVisible: false
    });


    const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
        setNotification({
            message,
            type,
            isVisible: true
        })
    }

    const hideNotification = () => {
        setNotification((prev) => ({...prev, isVisible: false}))
    }

    return {
        notification,
        showNotification,
        hideNotification,
    }
}

export default useNotification;