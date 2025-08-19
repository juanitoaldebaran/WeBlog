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
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    setIsLoading(true);
    try {
      const response: LoginResponse = await authService.login(credentials);

      setIsAuthenticated(true);
      setUser({
        email: credentials.email,
      } as User);

      return response;
    } catch (error: any) {
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
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
