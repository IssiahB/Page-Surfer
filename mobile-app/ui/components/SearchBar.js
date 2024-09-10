import React from "react";
import {
    StyleSheet,
    TextInput,
    View,
    Keyboard,
    Text,
    TouchableOpacity,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

export default function SearchBar({
    clicked,
    searchPhrase,
    setSearchPhrase,
    setClicked,
}) {
    return (
        <View style={styles.container}>
            <View
                style={
                    clicked
                        ? styles.searchBar_clicked
                        : styles.searchBar_unclicked
                }
            >
                {/* search Icon */}
                <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                />
                {/* Input field */}
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchPhrase}
                    onChangeText={setSearchPhrase}
                    onFocus={() => {
                        setClicked(true);
                    }}
                />
                {/* cross Icon, depending on whether the search bar is clicked or not */}
                {clicked && (
                    <Entypo
                        name="cross"
                        size={20}
                        color="black"
                        style={{ padding: 1 }}
                        onPress={() => {
                            setSearchPhrase("");
                        }}
                    />
                )}
            </View>
            {/* cancel button, depending on whether the search bar is clicked or not */}
            {clicked && (
                <TouchableOpacity
                    style={styles.button_container}
                    onPress={() => {
                        Keyboard.dismiss();
                        setClicked(false);
                    }}
                >
                    <Text style={styles.button_text}>Cancel</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

// styles
const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
    },
    searchBar_unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar_clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
    button_container: {
        paddingLeft: 20,
    },
    button_text: {
        fontWeight: "bold",
        color: "#db5300",
        fontSize: 17,
    },
});
