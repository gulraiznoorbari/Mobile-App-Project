import "expo-dev-client";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GOOGLE_SIGNIN_CLIENT_WEB_ID } from "@env";
import auth from "@react-native-firebase/auth";

const GoogleAuth = ({ setUserGoogleLogin }) => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const navigation = useNavigation();

    GoogleSignin.configure({
        webClientId: GOOGLE_SIGNIN_CLIENT_WEB_ID,
    });

    // Handle user state changes
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            setUser(user);
            if (initializing) setInitializing(false);
        });
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    const onGoogleButtonPress = async () => {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            // Sign-in the user with the credential
            const user_signin = auth().signInWithCredential(googleCredential);
            user_signin
                .then((user) => {
                    console.log(user);
                    setUserGoogleLogin(true);
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
            setUserGoogleLogin(false);
            setUser(null);
            navigation.navigate("Login");
        } catch (error) {
            console.error(error);
        }
    };

    if (!user) {
        return (
            <Pressable
                onPress={() =>
                    onGoogleButtonPress().then(() => console.log("Signed in with Google!"))
                }
                style={styles.button}
            >
                <Text style={styles.buttonText}>Continue with Google</Text>
            </Pressable>
        );
    }
    return (
        <View>
            <Text>Welcome {user.displayName}</Text>
            {user.photoURL && (
                <Image
                    source={{ uri: user.photoURL }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                />
            )}

            <Pressable onPress={googleSignOut} style={styles.button}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#181818",
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: 300,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        color: "#ffffff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    },
});

export default GoogleAuth;
