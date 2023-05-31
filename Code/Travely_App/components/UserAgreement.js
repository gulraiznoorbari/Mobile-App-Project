import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FontLoader from "./FontLoader";

const UserAgreement = ({ status }) => {
    return (
        <FontLoader>
            <View style={styles.agreementContainer}>
                <Text style={styles.agreementText}>
                    By {status}, you agree to Travely's{" "}
                    <Text style={styles.highlightedText}>Terms of Service</Text> and{" "}
                    <Text style={styles.highlightedText}>Privacy Policy</Text>.
                </Text>
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    agreementContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 60,
        paddingHorizontal: 20,
    },
    agreementText: {
        fontFamily: "Poppins",
        fontSize: 12,
        color: "#000",
        textAlign: "center",
    },
    highlightedText: {
        fontFamily: "Poppins",
        color: "#003580",
    },
});

export default UserAgreement;
