import { StyleSheet, Text, Pressable } from "react-native";
import { signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";

const GoogleAuth = () => {
    const googleAuth = () => {
        signInWithRedirect(auth, googleProvider)
            .then((userCredentials) => {
                const user = userCredentials.user;
                // IdP data available using getAdditionalUserInfo(result)
                alert(user.displayName);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;

                console.log(errorCode, errorMessage, email);
            });
    };

    return (
        <Pressable onPress={googleAuth} style={styles.button}>
            <Text style={styles.buttonText}>Continue with Google</Text>
        </Pressable>
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
