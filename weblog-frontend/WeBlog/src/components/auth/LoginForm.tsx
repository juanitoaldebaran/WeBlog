import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { LoginRequest } from "../../types/auth";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../common/LoadingSpinner";
import { Eye, EyeOff } from "lucide-react";
import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";


const LoginForm: React.FC = () => {
    const [loginData, setLoginData] = useState<LoginRequest>({
        email: "",
        password: "",
    });
    const {login, isLoading} = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const isFormValid = loginData.email && loginData.password;
    const navigate = useNavigate();
    const location = useLocation();
    const fromPath = location.state?.fromPath?.pathname || "/";
    const {notification, showNotification, hideNotification} = useNotification();

    const handleChange =  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value,
        }));

    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!isFormValid) {
            showNotification("Please fill all fields", "warning");
            return;
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(loginData.email)) {
            showNotification("Please input a valid email address", "error");
            return;
        }

        try {
            await login(loginData);
            showNotification("Login succesful!, Welcome back", "success");
            console.log("Login successfully");
            setTimeout(() => {
                navigate(fromPath, { replace: true })
            }, 1500);
        } catch (error: any) {
            showNotification("Login Failed. Please check your credentials", "error")
        } 
    }

    
    return (
        <div className="max-w-md bg-white p-12 sm:px-6 lg:px-8 w-full space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-light">Login</h1>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
                <p className="text-center">
                    Create an account?
                </p>
                <Link to={'/auth/signup'} className="text-blue-500 underline">Sign Up</Link>
            </div>
            <form className="mt-8 space-y-8" onSubmit={handleSubmit}>

                <div>
                    <input
                    id="email"
                    name="email" 
                    type="email"
                    value={loginData.email}
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
                    value={loginData.password}
                    placeholder="Password" 
                    onChange={handleChange}
                    className="w-full p-2 bg-white border-b focus:border-b-blue-400 focus:outline-none transition-all" 
                    />
                    
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 cursor-pointer">
                        {showPassword ? <Eye  size={20}/>: <EyeOff size={20}/>}
                    </button>
                </div>

                <button disabled={!isFormValid} type="submit" className="w-full bg-blue-500 p-2 rounded-lg text-white cursor-pointer hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? <LoadingSpinner/> : "Login"}
                </button>
                
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

export default LoginForm;