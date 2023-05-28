import { useEffect, useState } from "react";
import { useRouter, Link } from "expo-router";
import { StyleSheet, Text, TextInput, View, Button, KeyboardAvoidingView } from "react-native";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebase/config";
import GoogleAuth from "../../components/GoogleAuth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const navigation = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.push("/");
                console.log("User logged in");
            }
        });
        return unsubscribe;
    }, []);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log("User logged in");
            })
            .catch((error) => {
                if (error.code === "auth/invalid-email") {
                    console.log("That email address is invalid!");
                }
                if (error.code === "auth/user-not-found") {
                    setErrMessage("User not found");
                }
                if (error.code === "auth/wrong-password") {
                    setErrMessage("Wrong password");
                } else {
                    console.log(error);
                    setErrMessage("Something went wrong, check console");
                }
            });
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text style={styles.loginHeading}>Login</Text>
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
            <View style={styles.LoginButton}>
                <Button title="Login" onPress={handleLogin} />
            </View>
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errMessage}</Text>
            </View>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>
                    Don't have an account? <Text> </Text>
                    <Link href={"/screens/Signup"} style={styles.footerLink}>
                        <Text>Sign up</Text>
                    </Link>
                </Text>
            </View>
            <GoogleAuth />
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

export default Login;