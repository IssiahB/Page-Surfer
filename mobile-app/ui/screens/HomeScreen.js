import React, { useState } from "react";
import { useFonts } from "expo-font";
import { View, Text, FlatList, StyleSheet, StatusBar } from "react-native";
import SearchBar from "../components/SearchBar";

export default function HomeScreen({ route, navigation }) {
    const [fontsLoaded] = useFonts({
        "Forum-Regular": require("../../assets/fonts/Forum-Regular.ttf"),
    });

    const username = "Username";

    // const { username } = route.params;
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const recentSearches = ["Book1", "Book2"]; // Example of recent searches
    const savedBooks = ["Saved Book 1", "Saved Book 2"]; // Example of saved books

    const handleSearch = () => {
        // Implement search logic here
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#d9dbda" barStyle="dark-content" />
            <Text style={styles.title}>Welcome, {username}!</Text>

            <SearchBar
                clicked={isSearchClicked}
                searchPhrase={searchQuery}
                setSearchPhrase={setSearchQuery}
                setClicked={setIsSearchClicked}
            />

            <Text style={{ fontSize: 18, marginTop: 20 }}>Recent Searches</Text>
            <FlatList
                data={recentSearches}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />

            <Text style={{ fontSize: 18, marginTop: 20 }}>Saved Books</Text>
            <FlatList
                data={savedBooks}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        // backgroundColor: "#fff4ed",
        height: "100%",
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        marginVertical: 20,
        fontFamily: "Forum-Regular",
    },
});
