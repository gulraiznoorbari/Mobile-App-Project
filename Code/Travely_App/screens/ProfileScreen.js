import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";

import { authentication } from "../firebase/config";
import { getUserData } from "../firebase/utils";
import MenuOption from "../components/MenuOption";
import { PlaceHolder } from "../assets/images";
import FontLoader from "../components/FontLoader";
import PrimaryButton from "../components/Buttons/PrimaryButton";

const ProfileScreen = () => {
    const [userFirstName, setUserFirstName] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [errMessage, setErrMessage] = useState("");

    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserData(authentication.currentUser.uid);
                console.log(userData.FirstName);
                if (userData) {
                    setUserFirstName(userData.FirstName);
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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setProfileImage(result.uri);
        }
    };

    const handleLogout = () => {
        signOut(authentication)
            .then(() => {
                console.log("User signed out!");
                navigation.navigate("Login");
            })
            .catch((error) => {
                console.log(error.message);
                setErrMessage(error.message);
            });
    };

    return (
        <FontLoader>
            <View style={styles.container}>
                <TouchableOpacity onPress={pickImage}>
                    <View style={styles.circleContainer}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <Image source={PlaceHolder} style={styles.profileImage} />
                        )}
                    </View>
                </TouchableOpacity>
                <Text style={styles.subheading}>{userFirstName}</Text>
                <View style={styles.optionsContainer}>
                    <MenuOption icon="account" text="Bookings" redirectTo="Bookings" />
                    <MenuOption
                        icon="cart"
                        text="Change Password"
                        redirectTo="ChangePasswordScreen"
                    />
                    <Text
                        style={{
                            fontSize: 22,
                            fontFamily: "Poppins-Bold",
                            marginTop: 20,
                            marginBottom: 10,
                        }}
                    >
                        About
                    </Text>
                    <MenuOption icon="information" text="Privacy Policy" redirectTo="Privacy" />
                    <MenuOption icon="logout" text="FAQ" redirectTo="FAQ" />
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton text="Logout" action={handleLogout} />
                </View>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errMessage}</Text>
                </View>
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    subheading: {
        fontSize: 22,
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        marginTop: 20,
    },
    buttonContainer: {
        padding: 20,
    },
    optionsContainer: {
        marginTop: 10,
    },
    circleContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
    },
    errorText: {
        color: "red",
    },
    errorContainer: {
        height: 20,
    },
});

export default ProfileScreen;
