import axios from "axios";
// import { UserProfile } from "../types/auth";
import { consts } from "../utils";

export const fetchUserProfile = async (id: string): Promise<any> => {
    try {
        const response = await axios.get(`${consts.BACKEND_ENPOINT}/users/profile/${id}`);
        return response;
    } catch (error) {
        console.error('Profile fetch error:', error);
        throw error;
    }
};

// Add this function to your existing user API file
export const updateUserProfile = async (userId: string, userData: any) => {
    try {
        const token = localStorage.getItem(consts.AUTH_TOKEN);
        if (!token) {
            throw new Error('Authentication token not found');
        }

        const response = await axios.put(
            `${consts.BACKEND_ENPOINT}/users/${userId}`,
            userData
        );

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Failed to update user profile');
    }
};

