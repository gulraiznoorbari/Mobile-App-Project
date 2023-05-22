import { StyleSheet, Text, TextInput, View, Button, Pressable } from "react-native";
import { useState } from "react";

import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");

    const handleLogin = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setUserLoggedIn(true);
            })
            .catch((error) => {
                console.log(error.message);
                setErrMessage(error.message);
            });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.loginHeading}>Login</Text>
            <TextInput
                placeholder="Enter First Name"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.email}
            />
            <TextInput
                placeholder="Enter Last Name"
                value={lastName}
                onChangeText={setLastName}
                style={styles.email}
            />
            <TextInput
                placeholder="Enter Email"
                value={email}
                onChangeText={setEmail}
                style={styles.email}
            />
            <TextInput
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.password}
            />
            <TextInput
                placeholder="Re-enter Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.password}
            />
            <View style={styles.LoginButton}>
                <Button title="Sign up" onPress={handleLogin} />
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
    loginHeading: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    email: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
    },
    password: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
    },
    LoginButton: {
        marginTop: 20,
    },
    errorText: {
        color: "red",
    },
    errorContainer: {
        height: 20,
    },
    footerView: {
        alignItems: "center",
        marginTop: 20,
    },
    footerText: {
        fontSize: 14,
        color: "#2e2e2d",
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default Signup;
