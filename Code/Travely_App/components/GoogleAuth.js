import { StyleSheet, Text, Pressable, Image } from "react-native";
import FontLoader from "./FontLoader";
import { Google } from "../assets/images";

const GoogleAuth = () => {
    return (
        <FontLoader>
            <Pressable
                style={styles.googleButtonContainer}
                onPress={() => console.log("Signed in with Google!")}
            >
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
