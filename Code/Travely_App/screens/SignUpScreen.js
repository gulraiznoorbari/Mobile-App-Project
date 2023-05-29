import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, KeyboardAvoidingView } from "react-native";
import { useNavigation, Link } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { authentication, db } from "../firebase/config";

const SignUpScreen = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");

    const navigation = useNavigation();

    const resetUser = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    const matchPassword = () => {
        password === confirmPassword ? handleSignup() : setErrMessage("Passwords do not match");
    };

    const signupSuccess = () => {
        console.log("User registered successfully");
        navigation.navigate("Home");
    };

    const AddUserToDB = async (user) => {
        await setDoc(doc(db, "Users", user.uid), {
            FirstName: firstName,
            LastName: lastName,
            Email: user.email,
        });
    };

    const handleSignup = () => {
        createUserWithEmailAndPassword(authentication, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                AddUserToDB(user);
                signupSuccess();
                resetUser();
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    setErrMessage("That email address is already in use!");
                }
                if (error.code === "auth/invalid-email") {
                    setErrMessage("That email address is invalid!");
                }
                if (error.code === "auth/weak-password") {
                    setErrMessage("Password should be at least 6 characters");
                } else {
                    console.log(error);
                    setErrMessage("Something went wrong, check console");
                }
            });
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text style={styles.loginHeading}>Sign up</Text>
            <TextInput
                placeholder="Enter First Name"
                value={firstName}
                onChangeText={setFirstName}
                keyboardType="default"
                style={styles.email}
            />
            <TextInput
                placeholder="Enter Last Name"
                value={lastName}
                onChangeText={setLastName}
                keyboardType="default"
                style={styles.email}
            />
            <TextInput
                placeholder="Enter Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.email}
            />
            <TextInput
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
                keyboardType="default"
                secureTextEntry={true}
                style={styles.password}
            />
            <TextInput
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                keyboardType="default"
                secureTextEntry={true}
                style={styles.password}
            />
            <View style={styles.LoginButton}>
                <Button title="Sign up" onPress={matchPassword} />
            </View>
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errMessage}</Text>
            </View>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>
                    Already a member? <Text> </Text>
                    <Link to={"/Login"} style={styles.footerLink}>
                        <Text>Log in</Text>
                    </Link>
                </Text>
            </View>
        </KeyboardAvoidingView>
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

export default SignUpScreen;
