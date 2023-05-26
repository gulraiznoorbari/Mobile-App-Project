import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { signOut } from "firebase/auth";

import { auth } from "../firebase/config";
import { getUserData } from "../firebase/utils";

const Home = () => {
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const navigation = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserData(auth.currentUser.uid);
                console.log(userData);
                if (userData) {
                    setUserFirstName(userData.FirstName);
                    setUserLastName(userData.LastName);
                    setUserEmail(userData.Email);
                }
            } catch (error) {
                console.log(error.message);
                setErrMessage(error.message);
            }
        };
        if (auth.currentUser) {
            fetchUserData();
        }
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out!");
                navigation.replace("screens/Login");
            })
            .catch((error) => {
                console.log(error.message);
                setErrMessage(error.message);
            });
    };

    return (
        <>
            {auth.currentUser ? (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.heading}>Welcome to Travely!</Text>
                    <Text style={styles.subheading}>
                        Name: {userFirstName + " " + userLastName}
                    </Text>
                    <Text style={styles.subheading}>Email: {userEmail}</Text>
                    {/* <Text style={styles.subheading}>Email: {auth.currentUser.email}</Text> */}
                    <View style={styles.buttonContainer}>
                        <Button title="Logout" onPress={handleLogout} />
                    </View>
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errMessage}</Text>
                    </View>
                </SafeAreaView>
            ) : (
                navigation.replace("screens/Login")
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
    subheading: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },
    buttonContainer: {
        marginTop: 20,
        padding: 20,
    },
    errorText: {
        color: "red",
    },
    errorContainer: {
        height: 20,
    },
});

export default Home;
