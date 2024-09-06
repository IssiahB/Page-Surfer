import React, { useState } from "react";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../components/Button";
import { signupUser, singupUser } from "../../api/auth";
import {
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";

const backgroundImage = require("../../assets/images/register-background.jpg");

const onPressForgotPassword = () => {
    // Do something about forgot password operation
};

export default function SignupScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        "Forum-Regular": require("../../assets/fonts/Forum-Regular.ttf"),
    });

    const [error, setError] = useState({
        errorMessage: "",
        errorFlag: false,
    });
    const [inputs, setInputs] = useState({
        email: "",
        username: "",
    });

    // State variable to hold the password
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Function to toggle the password visibility state
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onPressSignUp = async () => {
        try {
            const response = await signupUser(
                inputs.username,
                inputs.email,
                password
            );

            if (response.success) {
                console.log("Successfully created user");
            } else {
                setError({ errorMessage: response.message, errorFlag: true });
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
            <StatusBar backgroundColor="#fff4ed" barStyle="dark-content" />
            <Text style={styles.title}> Sign Up </Text>
            {error.errorFlag ? (
                <Text style={styles.error}>{error.errorMessage}</Text>
            ) : (
                <Text></Text>
            )}
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) =>
                        setInputs({ username: inputs.username, email: text })
                    }
                    placeholderTextColor="#003f5c"
                />
            </View>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={(text) =>
                        setInputs({ username: text, email: inputs.email })
                    }
                    placeholderTextColor="#003f5c"
                />
            </View>
            <View style={styles.container}>
                <TextInput
                    // Set secureTextEntry prop to hide
                    //password when showPassword is false
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
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

            <Button
                textContent="Signup"
                textColor="#fff4ed"
                btnColor="#db5300"
                onPress={() => onPressSignUp()}
                style={styles.loginBtn}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.signupText}>Login</Text>
            </TouchableOpacity>
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
        marginTop: 65,
        marginBottom: 10,
    },
});
