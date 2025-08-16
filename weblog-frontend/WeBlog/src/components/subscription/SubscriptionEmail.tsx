import { useState } from "react";

const SubscriptionEmail: React.FC = () => {
    const [subscriptionEmail, setSubscriptionEmail] = useState<string>("");

    const handleClick = () => {
        setSubscriptionEmail("");
    }

    return (
        <div className="flex items-center justify-center space-x-2">
            <input 
            type="text" 
            value={subscriptionEmail}
            placeholder="Enter your email"
            className="p-4 border shadow-md rounded w-100 focus:border-red-400"
            onChange={(e) => setSubscriptionEmail(e.target.value)}
            />
            <button onClick={handleClick} className="bg-gray-900 ocus:border-b-blue-400 focus:outline-none cursor-pointer p-4 rounded w-30 border-none text-white">
                Enter
            </button>
        </div>
    )
}

export default SubscriptionEmail;