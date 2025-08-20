import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { RegisterRequest } from "../../types/auth";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../common/LoadingSpinner";
import { Eye, EyeOff } from "lucide-react";
import PasswordMatch from "./PasswordMatch";
import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";


const RegisterForm: React.FC = () => {
    const [registerData, setRegisterData] = useState<RegisterRequest>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const {register, isLoading} = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const isFormValid = registerData.firstName && registerData.lastName && registerData.email && registerData.password && confirmPassword;
    const passwordValid = registerData.password && confirmPassword && registerData.password === confirmPassword;
    const navigate = useNavigate();
    const location = useLocation();
    const fromPath = location.state?.fromPath?.pathname || "/auth/login";
    const {notification, showNotification, hideNotification} = useNotification();


    const handleChange =  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value,
        }));
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!isFormValid) {
            showNotification("Please input all fields", "error");
            return;
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(registerData.email)) {
            showNotification("Please input a valid email address", "warning");
            return;
        }

        if (!passwordValid) {
            showNotification("Please enter a valid password", "warning");
            return;
        }

        try {
            await register(registerData);
            showNotification("Account has been created", "success");
            console.log("Register Successfully and Navigate to ", fromPath);
            setTimeout(() => {
                navigate(fromPath, { replace: true });
            }, 4000) 
        } catch (error: any) {
            showNotification("Failed to create an account", "error");
        } 
    }

    
    return (
        <div className="max-w-md bg-white p-12 sm:px-6 lg:px-8 w-full space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-light">Sign Up</h1>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
                <p className="text-center">
                    Already have an account?
                </p>
                <Link to={'/auth/login'} className="text-blue-500 underline">Login</Link>
            </div>
            <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
                

                <div>
                    <input
                    id="firstName"
                    name="firstName" 
                    type="text"
                    value={registerData.firstName}
                    placeholder="First Name"
                    onChange={handleChange}
                    className="w-full p-2 bg-white border-b focus:border-b-blue-400 focus:outline-none transition-all" 
                    />
                </div>

                <div>
                    <input
                    id="lastName"
                    name="lastName" 
                    type="text"
                    value={registerData.lastName}
                    placeholder="Last Name" 
                    onChange={handleChange}
                    className="w-full p-2 bg-white border-b focus:border-b-blue-400 focus:outline-none transition-all" 
                    />
                </div>

                <div>
                    <input
                    id="email"
                    name="email" 
                    type="email"
                    value={registerData.email}
                    placeholder="Email" 
                    onChange={handleChange}
                    className="w-full p-2 bg-white border-b focus:border-b-blue-400 focus:outline-none transition-all" 
                    />
                </div>

                <div className="flex relative">
                    <input
                    id="password"
                    name="password" 
                    type={showPassword ? "text" : "password"}
                    value={registerData.password}
                    placeholder="Password" 
                    onChange={handleChange}
                    className="w-full p-2 bg-white border-b focus:border-b-blue-400 focus:outline-none transition-all" 
                    />
                    
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 cursor-pointer">
                        {showPassword ? <Eye  size={20}/>: <EyeOff size={20}/>}
                    </button>
                </div>

                <div className="flex relative">
                    <input
                    id="confirm-password"
                    name="confirm-password" 
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    placeholder="Confirm Password" 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 bg-white border-b focus:border-b-blue-400 focus:outline-none transition-all" 
                    />

                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 cursor-pointer">
                        {showPassword ? <Eye  size={20}/>: <EyeOff size={20}/>}
                    </button>
                </div>
                {confirmPassword && 
                       <PasswordMatch 
                        message={passwordValid ? "Password matches confirm password" : "Password must be match with confirm password"}
                        status={passwordValid ? "success" : "error"}
                    />
                }

                <button disabled={!isFormValid} type="submit" className="w-full bg-blue-500 p-2 rounded-lg text-white cursor-pointer hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? <LoadingSpinner/> : "Sign Up"}
                </button>

                <div>
                    <p className="text-[14px] text-center">By creating an account, you are accepting our privacy policy and personal terms</p>
                </div>
            </form>

            <Notification 
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={hideNotification}
                position="top-center"
                duration={4000}
            />

        </div>
    )
}

export default RegisterForm;