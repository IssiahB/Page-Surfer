import {
    StyleSheet,
    TextInput,
    View,
    Keyboard,
    Text,
    TouchableOpacity,
} from "react-native";

export default function ProfileScreen() {
    return <Text style={styles.title}>This is the Profile Screen!</Text>;
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
    },
});
