import { StyleSheet, Text, View } from "react-native";
import React from "react";

const UserAgreement = ({ status }) => {
    return (
        <View style={styles.agreementContainer}>
            <Text style={styles.agreementText}>
                By {status}, you agree to Travely's{" "}
                <Text style={styles.highlightedText}>Terms of Service</Text> and{" "}
                <Text style={styles.highlightedText}>Privacy Policy</Text>.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    agreementContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 75,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    agreementText: {
        fontSize: 13,
        color: "#000",
        textAlign: "center",
    },
    highlightedText: {
        color: "#003580",
    },
});

export default UserAgreement;
