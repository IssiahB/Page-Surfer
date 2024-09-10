import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import {
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";

import Button from "../components/Button";
import { loginUser } from "../../api/auth";
import { AuthContext } from "../../logic/Contexts";

const backgroundImage = require("../../assets/images/register-background.jpg");

const onPressForgotPassword = () => {
    // Do something about forgot password operation
};

export default function LoginScreen({ navigation, route }) {
    const [fontsLoaded] = useFonts({
        "Forum-Regular": require("../../assets/fonts/Forum-Regular.ttf"),
    });

    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const [error, setError] = useState({
        errorMessage: "",
        errorFlag: false,
    });

    const [username, setUsername] = useState("");

    // State variable to hold the password
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [visibleSnack, setVisibleSnack] = useState(false); // Snackbar visibility

    // Function to toggle the password visibility state
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onPressLogin = async () => {
        try {
            const response = await loginUser(username, password);

            if (response[0].success) {
                setVisibleSnack(true); // Show success message
                setTimeout(() => {
                    setVisibleSnack(false);
                    setIsLoggedIn(true);
                }, 1000);
            } else {
                setError({
                    errorMessage: response[0].message,
                    errorFlag: true,
                });
            }
        } catch (error) {
            setError({ errorMessage: "Client Error", errorFlag: true });
            console.error(error);
        }
    };

    return (
        <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            style={styles.backgound}
        >
            {/* Status bar style and Title */}
            <StatusBar backgroundColor="#fff4ed" barStyle="dark-content" />
            <Text style={styles.title}> Login </Text>

            {/* Error message */}
            {error.errorFlag ? (
                <Text style={styles.error}>{error.errorMessage}</Text>
            ) : (
                <Text></Text>
            )}

            {/* User input field */}
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Username or Email"
                    onChangeText={(text) => setUsername(text)}
                    placeholderTextColor="#003f5c"
                />
            </View>

            {/* Password field with eye icon */}
            <View style={styles.container}>
                <TextInput
                    // Set secureTextEntry prop to hide
                    //password when showPassword is false
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    placeholder="Enter Password"
                    placeholderTextColor="#aaa"
                />
                <MaterialCommunityIcons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#aaa"
                    style={styles.icon}
                    onPress={toggleShowPassword}
                />
            </View>

            {/* Forgot password button */}
            <TouchableOpacity onPress={onPressForgotPassword}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Official Login Button */}
            <Button
                textContent="Login"
                textColor="#fff4ed"
                btnColor="#db5300"
                onPress={onPressLogin}
                style={styles.loginBtn}
            />

            {/* Change to signup button */}
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.signupText}>Signup</Text>
            </TouchableOpacity>

            {/* Snackbar */}
            <Snackbar
                visible={visibleSnack}
                onDismiss={() => setVisibleSnack(false)}
                duration={2000}
            >
                User login successful!
            </Snackbar>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgound: {
        width: "100%",
        height: "100%",
    },
    title: {
        fontWeight: "bold",
        fontSize: 60,
        color: "#db5300",
        textAlign: "center",
        marginTop: "30%",
        marginBottom: "25%",
    },
    error: {
        textAlign: "center",
        color: "red",
    },
    container: {
        flexDirection: "row",
        width: "75%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff4ed",
        borderRadius: 8,
        paddingHorizontal: 14,
        marginLeft: "13%",
        marginBottom: "10%",
    },
    input: {
        flex: 1,
        color: "#333",
        paddingVertical: 10,
        paddingRight: 10,
        fontSize: 16,
    },
    icon: {
        marginLeft: 10,
    },
    forgotText: {
        color: "#fff4ed",
        fontSize: 20,
        textAlign: "center",
        marginTop: "-5%",
    },
    signupText: {
        color: "#fff4ed",
        fontSize: 20,
        textAlign: "center",
    },
    loginBtn: {
        marginTop: 120,
        marginBottom: 10,
    },
});
