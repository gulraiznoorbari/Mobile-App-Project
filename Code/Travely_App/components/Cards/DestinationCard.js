import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";

const DestinationCard = ({ text, image, action }) => {
    return (
        <TouchableOpacity style={styles.destinationBG} onPress={action}>
            <ImageBackground source={image} style={styles.destinationImage} resizeMode="cover">
                <View style={styles.tintOverlay} />
                <Text style={styles.destinationText}>{text}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    destinationBG: {
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 10,
    },
    destinationImage: {
        width: 150,
        height: 100,
        justifyContent: "flex-end",
        alignItems: "flex-start",
    },
    tintOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    destinationText: {
        fontFamily: "Poppins SemiBold",
        fontSize: 15,
        color: "#fff",
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
});

export default DestinationCard;
