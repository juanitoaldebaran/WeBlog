import authService from "../services/authService";
import type { LoginRequest, RegisterRequest, User } from "../types/auth";
import { useEffect, useState } from "react";

export const useAuth = () => {
   const [user, setUser] = useState<User | null>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
      const jwtToken = authService.getJwtToken();

      if (jwtToken) {
         setIsAuthenticated(true);
      }
   
   }, [])

   const login = async (credentials: LoginRequest) => {
      setIsLoading(true);
      try {
         const response = await authService.login(credentials);
         setIsAuthenticated(true);
         setUser({
            email: credentials.email,
            password: credentials.password
         } as User);

         return response;
      } catch (error: any) {
         setIsAuthenticated(false);
      } finally {
         setIsLoading(false);
      }
   }

   const register = async (credentials: RegisterRequest) => {
      setIsLoading(true);
      try {
         const response = await authService.register(credentials);

         setIsAuthenticated(true);
         setUser(user);

         return response;
      } catch (error: any) {
         setIsAuthenticated(false);
      } finally {
         setIsLoading(false);
      }
   } 

   const logout = () => {
      authService.logout();
      setIsAuthenticated(false);
      setUser(null);
   } 

   const getJwtToken = (): string | null => {
      return authService.getJwtToken();
   }

   return {
      login,
      register,
      logout,
      getJwtToken,
      user,
      isLoading,
      isAuthenticated
   }

}