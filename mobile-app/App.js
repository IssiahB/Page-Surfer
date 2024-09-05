import { useContext, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./ui/screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
