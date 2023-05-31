import { StyleSheet, Text, Pressable, Image } from "react-native";

const GoogleAuth = () => {
    return (
        <Pressable
            style={styles.googleButtonContainer}
            onPress={() => console.log("Signed in with Google!")}
        >
            <Image source={require("../assets/images/Google.png")} style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    googleButtonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#181818",
        padding: 10,
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
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
    },
});

export default GoogleAuth;
