import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import { useNavigation, Link } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { authentication, db } from "../firebase/config";
import LogoHeader from "../components/LogoHeader";
import SubHeading from "../components/SubHeading";
import InputField from "../components/InputField";
import ErrorMessage from "../components/ErrorMessage";
import PrimaryButton from "../components/PrimaryButton";
import TextLink from "../components/TextLink";
import UserAgreement from "../components/UserAgreement";

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
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView behavior="padding">
                <LogoHeader text={"Travely."} />
                <SubHeading text={"Become a Travely member."} />
                <InputField
                    label={"First Name"}
                    placeholder={"Enter First Name"}
                    value={firstName}
                    onChangeText={setFirstName}
                    hideInput={false}
                />
                <InputField
                    label={"Last Name"}
                    placeholder={"Enter Last Name"}
                    value={lastName}
                    onChangeText={setLastName}
                    hideInput={false}
                />
                <InputField
                    label={"Email"}
                    placeholder={"Enter Email"}
                    value={email}
                    onChangeText={setEmail}
                    hideInput={false}
                />
                <InputField
                    label={"Password"}
                    placeholder={"Enter Password"}
                    value={password}
                    onChangeText={setPassword}
                    hideInput={true}
                />
                {errMessage && <ErrorMessage errorMessage={errMessage} marginVertical={15} />}
                <InputField
                    label={"Confirm Password"}
                    placeholder={"Re-enter Password"}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    hideInput={true}
                />
                <PrimaryButton text={"Sign up"} onPress={matchPassword} />
                <View style={styles.LoginOptionContainer}>
                    <Text style={styles.LoginOptionText}>
                        Already a member? <TextLink text={"Login"} redirectTo={"/Login"} />
                    </Text>
                </View>
                <UserAgreement status={"creating a account"} />
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    LoginOptionContainer: {
        alignItems: "center",
        marginTop: 10,
    },
    LoginOptionText: {
        fontSize: 14,
        color: "#2e2e2d",
    },
});

export default SignUpScreen;
