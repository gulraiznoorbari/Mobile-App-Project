import { useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { authentication, db } from "../firebase/config";
import LogoHeader from "../components/LogoHeader";
import SubHeading from "../components/SubHeading";
import InputField from "../components/InputField";
import ErrorMessage from "../components/ErrorMessage";
import PrimaryButton from "../components/Buttons/PrimaryButton";
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
        console.log("Sign up button pressed");
        password === confirmPassword
            ? createUserWithEmailAndPassword(authentication, email, password)
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
                          setErrMessage("Something went wrong, try again.");
                      }
                  })
            : setErrMessage("Passwords do not match");
    };

    return (
        <KeyboardAvoidingView behavior="height">
            <ScrollView showsVerticalScrollIndicator={false}>
                <LogoHeader text={"Travely."} />
                <SubHeading text={"Become a Travely member."} />
                <InputField
                    label={"First Name"}
                    placeholder={"Enter First Name"}
                    value={firstName}
                    setValue={setFirstName}
                    hideInput={false}
                />
                <InputField
                    label={"Last Name"}
                    placeholder={"Enter Last Name"}
                    value={lastName}
                    setValue={setLastName}
                    hideInput={false}
                />
                <InputField
                    label={"Email"}
                    placeholder={"Enter Email"}
                    value={email}
                    setValue={setEmail}
                    hideInput={false}
                />
                <InputField
                    label={"Password"}
                    placeholder={"Enter Password"}
                    value={password}
                    setValue={setPassword}
                    hideInput={true}
                />
                {errMessage && <ErrorMessage errorMessage={errMessage} marginVertical={10} />}
                <InputField
                    label={"Confirm Password"}
                    placeholder={"Re-enter Password"}
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    hideInput={true}
                />
                <PrimaryButton text={"Sign up"} action={handleSignup} marginHorizontal={20} />
                <View style={styles.LoginOptionContainer}>
                    <Text style={styles.LoginOptionText}>
                        Already a member? <TextLink text={"Login"} redirectTo={"/Login"} />
                    </Text>
                </View>
                <UserAgreement status={"creating a account"} />
            </ScrollView>
        </KeyboardAvoidingView>
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
