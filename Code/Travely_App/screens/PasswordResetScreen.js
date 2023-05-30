import { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";

import { authentication } from "../firebase/config";
import { getUserData } from "../firebase/utils";
import ErrorMessage from "../components/ErrorMessage";
import PrimaryButton from "../components/PrimaryButton";
import InputField from "../components/InputField";
import TextLink from "../components/TextLink";

const PasswordResetScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [errMessage, setErrMessage] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserData(authentication.currentUser.uid);
                if (userData) {
                    setEmail(userData.Email);
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

    const handleResetPassword = () => {
        sendPasswordResetEmail(authentication, email)
            .then(() => {
                console.log("Password reset email sent!");
                navigation.navigate("Login");
            })
            .catch((error) => {
                if (error.code === "auth/invalid-email") {
                    console.log("That email address is invalid!");
                }
                if (error.code === "auth/user-not-found") {
                    setErrMessage("User not found");
                } else {
                    console.log(error);
                }
            });
    };

    return (
        <KeyboardAvoidingView behavior="padding">
            <Text style={styles.infoText}>
                Enter the email address associated with your account and we'll send you a link to
                reset your password.
            </Text>
            <InputField
                label={"Email"}
                placeholder={"Enter Email Address"}
                value={email}
                setValue={setEmail}
                hideInput={false}
            />
            {errMessage && <ErrorMessage message={errMessage} marginVertical={15} />}
            <PrimaryButton text={"Reset Password"} action={handleResetPassword} />
            <View style={styles.SignupOptionContainer}>
                <Text style={styles.SignupOptionText}>
                    Don't have an account? <TextLink text={"Sign up"} redirectTo={"/SignUp"} />
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
};

export default PasswordResetScreen;

const styles = StyleSheet.create({
    infoText: {
        marginHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
    SignupOptionContainer: {
        alignItems: "center",
        marginTop: 10,
    },
    SignupOptionText: {
        fontSize: 14,
        color: "#2e2e2d",
    },
});
