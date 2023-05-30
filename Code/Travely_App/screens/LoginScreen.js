import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { authentication } from "../firebase/config";
import GoogleAuth from "../components/GoogleAuth";
import LogoHeader from "../components/LogoHeader";
import SubHeading from "../components/SubHeading";
import InputField from "../components/InputField";
import ErrorMessage from "../components/ErrorMessage";
import PrimaryButton from "../components/PrimaryButton";
import TextLink from "../components/TextLink";
import TextLinkIcon from "../components/TextLinkIcon";
import UserAgreement from "../components/UserAgreement";

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
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <LogoHeader text="Travely." />
            <SubHeading text="Sign in to unlock the best of Travely." />
            <InputField
                label="Email address"
                placeholder="Enter Email Address"
                value={email}
                setValue={setEmail}
            />
            <InputField
                label="Password"
                placeholder="Enter Password"
                value={password}
                setValue={setPassword}
            />
            {errMessage && <ErrorMessage errorMessage={errMessage} marginVertical={15} />}
            <PrimaryButton text="Sign In" action={handleLogin} />
            <View style={styles.extraOptions}>
                <TextLink text="Create Account" redirectTo="/SignUp" />
                <TextLinkIcon
                    text="Forgot Password?"
                    redirectTo="/PasswordReset"
                    icon={<MaterialCommunityIcons name="lock-outline" size={17} color="#003580" />}
                />
            </View>
            <View style={styles.dividerContainer}>
                <View style={styles.divider}></View>
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.divider}></View>
            </View>
            <GoogleAuth />
            {/* <GoogleAuth setUserGoogleLogin={setUserGoogleLogin} /> */}
            <UserAgreement status="signing in" />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    extraOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 20,
    },

    dividerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5,
    },
    divider: {
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        marginHorizontal: 20,
        width: "35%",
    },
    dividerText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "500",
        color: "#000",
    },
});

export default LoginScreen;
