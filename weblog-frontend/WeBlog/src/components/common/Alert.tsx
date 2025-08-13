interface AlertProps {
    message: string;
    status: "error";
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({message, status, onClose}) => {
    const baseClass = "p-4 rounded-md mb-4 flex justify-items items-center";
    const typeClass = {
        "error": "bg-red-100 border border-red-400 text-red-700",
    }  

    return (
        <div className={`${baseClass} ${typeClass[status]}`}>
            <span>{message}</span>
            {onClose && (
                <button
                onClick={onClose}
                className="ml-4 text-lg font-semibold hover:opacity-75"
                >
                </button>
            )}
        </div>
    )
}

export default Alert;