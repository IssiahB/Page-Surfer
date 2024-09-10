import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import LandingScreen from "./ui/screens/LandingScreen";
import LoginScreen from "./ui/screens/LoginScreen";
import SignupScreen from "./ui/screens/SignupScreen";
import HomeScreen from "./ui/screens/HomeScreen";
import SettingsScreen from "./ui/screens/SettingsScreen";
import ProfileScreen from "./ui/screens/ProfileScreen";

import { AuthContext } from "./logic/Contexts";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Tabs for logged-in users
    function BottomTabNavigator() {
        return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    initialRouteName: "Home",
                    tabBarActiveTintColor: "#db5300",
                    tabBarInactiveTintColor: "#ccc",
                    tabBarLabelStyle: { fontSize: 12, marginBottom: 10 },
                    tabBarStyle: { height: "8%" },
                }}
            >
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="account"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Home"
                    initialRouteName="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color, size, focused }) => (
                            <MaterialCommunityIcons
                                name={focused ? "home" : "home-outline"}
                                color={color}
                                size={focused ? 30 : 24}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarLabel: "Settings",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="cog"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }

    // Stack Navigator for login/signup
    function AuthStackNavigator() {
        return (
            <Stack.Navigator initialRouteName="Landing">
                <Stack.Screen
                    name="Landing"
                    options={{ headerShown: false }}
                    component={LandingScreen}
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
        );
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <NavigationContainer>
                {/* Render Tabs if logged in, otherwise show Auth Stack */}
                {isLoggedIn ? <BottomTabNavigator /> : <AuthStackNavigator />}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
