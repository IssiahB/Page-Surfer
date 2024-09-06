import { useContext, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./ui/screens/HomeScreen";
import LoginScreen from "./ui/screens/LoginScreen";
import SignupScreen from "./ui/screens/SignupScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    console.log("App Executed!");

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    options={{ headerShown: false }}
                    initialParams={{}}
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="Login"
                    options={{ headerShown: false }}
                    component={LoginScreen}
                />
                <Stack.Screen
                    name="Signup"
                    options={{ headerShown: false }}
                    component={SignupScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
