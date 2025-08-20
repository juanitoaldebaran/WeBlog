import authService from "../services/authService";
import type { AuthContextType, LoginRequest, RegisterRequest, User, LoginResponse } from "../types/auth";
import { useEffect, useState } from "react";

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const jwtToken = authService.getJwtToken();
    const storedUser = localStorage.getItem("user");
    if (jwtToken && storedUser) {
      try {
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
        } catch (error: any) {
          console.error("Error parsing stored user", error);
          localStorage.removeItem("user");
          localStorage.removeItem("jwtToken");
          setIsAuthenticated(false);
          setUser(null);
        }
     }
     
  }, []);

  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    setIsLoading(true);
    try {
      const response: LoginResponse = await authService.login(credentials);

      if (response.user) {
        localStorage.setItem("jwtToken", response.jwtToken);
      }

      if (response.user) {
        setIsAuthenticated(true);
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
      }
    } catch (error: any) {

    }
  };

  const register = async (credentials: RegisterRequest): Promise<User> => {
    setIsLoading(true);
    try {
      const response: User = await authService.register(credentials);

      setIsAuthenticated(true);
      setUser(response);

      return response;
    } catch (error: any) {
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const getJwtToken = (): string | null => authService.getJwtToken();

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    getJwtToken
  };
};
