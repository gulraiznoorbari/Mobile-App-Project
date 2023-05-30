import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

const PrimaryButton = ({ text, action }) => {
    return (
        <Pressable style={styles.buttonContainer} onPress={action}>
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#003580",
        padding: 10,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 50,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
    },
});

export default PrimaryButton;