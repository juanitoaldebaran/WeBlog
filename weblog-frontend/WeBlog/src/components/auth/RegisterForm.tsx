import { useState } from "react";
import { Link } from "react-router-dom";
import type { RegisterRequest } from "../../types/auth";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../common/LoadingSpinner";
import { Eye, EyeOff } from "lucide-react";
import Alert from "../common/Alert";


const RegisterForm: React.FC = () => {
    const [registerData, setRegisterData] = useState<RegisterRequest>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>("");
    const {register, isLoading} = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const isFormValid = registerData.firstName && registerData.lastName && registerData.email && registerData.password && confirmPassword;

    const handleChange =  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        
        if (!isFormValid) {
            console.error("Invalid registration input");
            setError("");
            return;
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(registerData.email)) {
            setError("Please input a valid email address");
        }

        try {
            await register(registerData);

        } catch (error: any) {
            setError(error.message || "Registration Failed");
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
                {error && (
                    <Alert
                    message={error}
                    status="error"
                    onClose={() => setError("")}
                    >
                    </Alert>
                )}

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

                <div>
                    <input
                    id="confirm-password"
                    name="confirm-password" 
                    type="text"
                    value={confirmPassword}
                    placeholder="Confirm Password" 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 bg-white border-b focus:border-b-blue-400 focus:outline-none transition-all" 
                    />
                </div>

                <button disabled={!isFormValid} type="submit" className="w-full bg-blue-500 p-2 rounded-lg text-white cursor-pointer hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? <LoadingSpinner/> : "Sign Up"}
                </button>

                <div>
                    <p className="text-[14px] text-center">By creating an account, you are accepting our privacy policy and personal terms</p>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm;