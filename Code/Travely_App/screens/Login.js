import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Signup from "./Signup";

const Login = ({ setUserLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");

    const navigation = useRouter();

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
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
            <View style={styles.LoginButton}>
                <Button title="Login" onPress={handleLogin} />
            </View>
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errMessage}</Text>
            </View>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>
                    Don't have an account?
                    <Link href="./Signup">
                        <Text style={styles.footerLink}>Sign up</Text>
                    </Link>
                </Text>
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

export default Login;
