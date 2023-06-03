import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FontLoader from "./FontLoader";

const HeadingText = ({ text }) => {
    return (
        <FontLoader>
            <View style={styles.headingContainer}>
                <Text style={styles.headingText}>{text}</Text>
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    headingContainer: {
        marginTop: 15,
        marginBottom: 10,
    },
    headingText: {
        fontFamily: "Poppins-Bold",
        fontSize: 20,
    },
});

export default HeadingText;
