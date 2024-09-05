import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Button({
    textContent,
    btnColor,
    textColor,
    onPress,
    style = {},
}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text
                style={[
                    styles.text,
                    style,
                    { backgroundColor: btnColor, color: textColor },
                ]}
            >
                {textContent}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        width: "75%",
        borderRadius: 25,
        textAlign: "center",
        fontWeight: "bold",
        marginLeft: "11%",
        padding: "2%",
        fontSize: 27,
    },
});
