interface PasswordMatchProps {
    message: string;
    status: "success" | "error";
}

const PasswordMatch: React.FC<PasswordMatchProps> = ({message, status}) => {
    const baseClass = "mt-6";
    const typeClass = {
        "success": "text-green-700",
        "error": "text-red-700"
    }
    
    return (
        <div className={`${baseClass} ${typeClass[status]}`}>
            {message}
        </div>
    )
}

export default PasswordMatch;