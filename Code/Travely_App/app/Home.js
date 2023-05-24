import { useState } from "react";
import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { signOut } from "firebase/auth";

import { auth } from "../firebase/config";
import Login from "./screens/Login";

const Home = () => {
    const [errMessage, setErrMessage] = useState("");
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out!");
                setUserLoggedIn(false);
            })
            .catch((error) => {
                console.log(error.message);
                setErrMessage(error.message);
            });
    };

    return (
        <>
            {userLoggedIn ? (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.heading}>Home</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Logout" onPress={handleLogout} />
                    </View>
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errMessage}</Text>
                    </View>
                </SafeAreaView>
            ) : (
                <Login setUserLoggedIn={setUserLoggedIn} />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 50,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonContainer: {
        marginTop: 20,
    },
    errorText: {
        color: "red",
    },
    errorContainer: {
        height: 20,
    },
});

export default Home;
