import type { UserResponse, UserStats } from "../types/user";
import api from "../config/api";
import type { User } from "../types/auth";

async function getCurrentUserProfile(): Promise<UserResponse>  {
    try {
        const response = await api.get("/profile");
        
        return response.data as UserResponse;
    } catch (error: any) {
        throw new Error(error?.response?.status?.message || "Failed to get user profile");
    }
}

async function updateUserProfile(user: User): Promise<UserResponse> {
    try {
        const response = await api.put("/profile", user);

        return response.data as User;
    } catch (error: any) {
        throw new Error(error?.response?.status?.message || "Failed to update user profile");
    }
}

async function getUserStats(): Promise<UserStats> {
    try {
        const response = await api.get("/stats");
        
        return response.data as UserStats;
    } catch (error: any) {
        throw new Error(error?.response?.status?.message || "Failed to get user stats");
    }
}

export default {
    getCurrentUserProfile,
    updateUserProfile,
    getUserStats,
}