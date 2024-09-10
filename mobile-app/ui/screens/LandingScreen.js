import React from "react";
import { useFonts } from "expo-font";
import Button from "../components/Button";
import {
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    Image,
} from "react-native";

const backgroundImage = require("../../assets/images/book-cover.jpg");
const logoImage = require("../../assets/images/logo-round.png");

export default function LandingScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        "Forum-Regular": require("../../assets/fonts/Forum-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return <Text> Loading Assets... </Text>;
    }

    return (
        <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            style={styles.backgound}
        >
            <StatusBar backgroundColor="#fff4ed" barStyle="dark-content" />
            <Image
                source={logoImage}
                style={styles.logo}
                resizeMode="contain"
            ></Image>
            <Text style={styles.text}>Knowledge Where It's Needed</Text>
            <Button
                textContent="Sign Up"
                textColor="#db5300"
                btnColor="#fff4ed"
                onPress={() => {
                    navigation.navigate("Signup");
                }}
            />
            <Button
                textContent="Log In"
                textColor="#fff4ed"
                btnColor="#db5300"
                onPress={() => {
                    navigation.navigate("Login");
                }}
                style={{ marginTop: "10%" }}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgound: {
        width: "100%",
        height: "100%",
    },
    logo: {
        width: 280,
        height: 280,
        marginTop: "10%",
        marginLeft: "16%",
    },
    text: {
        color: "#db5300",
        textAlign: "center",
        marginTop: "5%",
        fontFamily: "Forum-Regular",
        fontSize: 20,
        marginBottom: "60%",
    },
});
