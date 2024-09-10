import axios from "axios";
import { handleApiError } from "../logic/ErrorHandler";
import * as SecureStore from "expo-secure-store";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const api = axios.create({
    baseURL: apiUrl,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
});

const authMessage = {
    success: false,
    message: "",
};

export const loginUser = async (user, password) => {
    try {
        const response = await api.post("/login", { user, password });

        // Deconstruct response data
        let { access_token, message, username } = response.data;
        let authMsg = { ...authMessage }; // Clone authMessage
        authMsg.message = message;

        if (access_token !== undefined) {
            // Successful login
            await SecureStore.setItemAsync("jwtToken", access_token);
            authMsg.success = true;
        }

        return [authMsg, username];
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const signupUser = async (username, email, password) => {
    try {
        response = await api.post("/signup", {
            email,
            username,
            password,
        });

        // Deconstruct response data
        let { access_token, message } = response.data;
        let authMsg = { ...authMessage }; // Clone authMessage
        authMsg.message = message;

        if (access_token !== undefined) {
            // Successful signup
            await SecureStore.setItemAsync("jwtToken", access_token);
            authMsg.success = true;
        }

        return authMsg;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};
