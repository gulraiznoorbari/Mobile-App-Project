import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";

import { authentication } from "../firebase/config";
import { getUserData } from "../firebase/utils";

const ProfileScreen = () => {
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [errMessage, setErrMessage] = useState("");

    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserData(authentication.currentUser.uid);
                console.log(userData.FirstName);
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
        if (authentication.currentUser) {
            fetchUserData();
        }
    }, []);

    const resetUserState = () => {
        setUserFirstName("");
        setUserLastName("");
        setUserEmail("");
    };

    const handleLogout = () => {
        signOut(authentication)
            .then(() => {
                resetUserState();
                console.log("User signed out!");
                navigation.navigate("Login");
            })
            .catch((error) => {
                console.log(error.message);
                setErrMessage(error.message);
            });
    };

    return (
        <View>
            <Text style={styles.heading}>Welcome to Travely!</Text>
            <Text style={styles.subheading}>Name: {userFirstName + " " + userLastName}</Text>
            <Text style={styles.subheading}>Email: {userEmail}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Logout" onPress={handleLogout} />
            </View>
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errMessage}</Text>
            </View>
        </View>
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

export default ProfileScreen;
