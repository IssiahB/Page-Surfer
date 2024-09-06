import * as SecureStore from "expo-secure-store";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const loginUser = async (username, password) => {
    try {
        //const response = await api.post("/login", { username, password });
    } catch (error) {
        throw error;
    }
};

export const signupUser = async (usrname, mail, pass) => {
    try {
        const response = await fetch(apiUrl.concat("/signup"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: usrname,
                email: mail,
                password: pass,
            }),
        });

        const jsonData = await response.json();
        let token = jsonData.get("access_token", null);
        let data = { success: false, message: "" };

        if (token !== null) {
            await SecureStore.setItemAsync("jwtToken", token);
            data.success = true;
        } else {
            data.message = response.data.message;
        }

        return data;
    } catch (error) {
        console.log(apiUrl);
        throw error;
    }
};
