import { useState, useEffect } from "react";
import { StyleSheet, Text, Pressable, Image } from "react-native";
import { GOOGLE_SIGNIN_CLIENT_WEB_ID } from "@env";
import { useNavigation } from "@react-navigation/native";
import { GoogleAuthProvider, signInWithCredential, onAuthStateChanged } from "firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { authentication } from "../firebase/config";

import FontLoader from "./FontLoader";
import { Google } from "../assets/images";

const GoogleAuth = () => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const navigation = useNavigation();

    GoogleSignin.configure({
        webClientId: GOOGLE_SIGNIN_CLIENT_WEB_ID,
    });

    // Handle user state changes
    useEffect(() => {
        const subscriber = onAuthStateChanged(authentication, (user) => {
            setUser(user);
            if (initializing) setInitializing(false);
        });
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    const onGoogleButtonPress = async () => {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices();
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
            // Create a Google credential with the token
            const googleCredential = GoogleAuthProvider.credential(idToken);
            // Sign-in the user with the credential
            await signInWithCredential(authentication, googleCredential)
                .then((user) => {
                    console.log(user);
                    navigation.navigate("Home");
                    console.log("User signed in");
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const googleSignOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await auth().signOut();
            setUser(null);
            navigation.navigate("Login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FontLoader>
            <Pressable style={styles.googleButtonContainer} onPress={() => onGoogleButtonPress()}>
                <Image source={Google} style={styles.googleIcon} />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
            </Pressable>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    googleButtonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#292929",
        padding: 8,
        marginHorizontal: 20,
        borderRadius: 50,
        marginTop: 20,
    },
    googleIcon: {
        width: 25,
        height: 25,
        marginRight: 20,
    },
    googleButtonText: {
        fontFamily: "Poppins SemiBold",
        fontSize: 15,
        textAlign: "center",
        color: "#fff",
    },
});

export default GoogleAuth;
