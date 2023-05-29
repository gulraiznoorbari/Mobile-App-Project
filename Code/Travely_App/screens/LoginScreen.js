import { useEffect, useState } from "react";
import { useNavigation, Link } from "@react-navigation/native";
import { StyleSheet, Text, TextInput, View, Button, KeyboardAvoidingView } from "react-native";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { authentication } from "../firebase/config";
import GoogleAuth from "../components/GoogleAuth";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authentication, (user) => {
            if (user) {
                // navigation.navigate("Home");
                console.log("User logged in");
            }
        });
        return unsubscribe;
    }, []);

    const resetUser = () => {
        setEmail("");
        setPassword("");
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(authentication, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigation.navigate("Home");
                console.log("User logged in..");
                resetUser();
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
                    setErrMessage("User not Found.");
                }
            });
    };

    return (
        <KeyboardAvoidingView behavior="padding">
            <View style={styles.logoContainer}>
                <Text style={styles.logoHeading}>Travely.</Text>
            </View>
            <View style={styles.subHeadingContainer}>
                <Text style={styles.subHeading}>Sign in to unlock best of Travely</Text>
            </View>
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
                    <Link to={"/SignUp"} style={styles.footerLink}>
                        <Text>Sign up</Text>
                    </Link>
                </Text>
            </View>
            {/* <GoogleAuth setUserGoogleLogin={setUserGoogleLogin} /> */}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    logoContainer: {
        padding: 35,
        backgroundColor: "#003580",
        fontFamily: "Poppins-Bold",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    logoHeading: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
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

export default LoginScreen;
