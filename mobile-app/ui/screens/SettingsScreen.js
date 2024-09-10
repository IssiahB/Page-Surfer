import {
    StyleSheet,
    TextInput,
    View,
    Keyboard,
    Text,
    TouchableOpacity,
} from "react-native";

export default function SettingsScreen() {
    return <Text style={styles.title}>This is the Settings Screen!</Text>;
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
    },
});
