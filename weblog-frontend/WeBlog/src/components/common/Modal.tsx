import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: () => void;
    children: React.ReactNode;
    title?: string;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, onSubmit, children, title}) => {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="p-6 bg-white rounded shadow-lg w-full max-w-lg">
                <div className="flex justify-between items-center mb-4 pb-2">
                    {title && <h2 className="text-xl font-semibold">{title}</h2>}
                    <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-800">
                        <FontAwesomeIcon icon={faX}/>
                    </button>
                </div>
                
                <div className="mb-4">
                    {children}
                </div>

                {onSubmit && (
                    <div className="flex items-center justify-between">
                        <button className="bg-green-400 rounded w-20 text-white p-2 shadow-lg cursor-pointer hover:bg-green-600 transition-all" onClick={onSubmit}>
                            Save
                        </button>
                        <button className="bg-red-400 p-2 w-20 rounded text-white cursor-pointer hover:bg-red-600" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Modal;