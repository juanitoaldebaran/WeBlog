import { useState } from "react";
import type { User } from "../../types/auth";

const SubscriptionEmail: React.FC = () => {
    const [subscriptionEmail, setSubscriptionEmail] = useState<string>("");

    return (    
        <div>
            <input 
            type="text" 
            value={subscriptionEmail}
            placeholder="Enter your email"
            />
        </div>
    )
}

export default SubscriptionEmail;