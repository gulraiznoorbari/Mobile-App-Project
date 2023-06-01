import { StyleSheet, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ButtonWithIcon = ({ iconName, size, marginRight, text, action }) => {
    return (
        <Pressable style={styles.heroButton} onPress={action}>
            <MaterialCommunityIcons
                name={iconName}
                size={size}
                color="black"
                style={{ marginRight: marginRight }}
            />
            <Text style={styles.heroButtonText}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    heroButton: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 6,
        borderRadius: 40,
        width: 150,
    },
    heroButtonText: {
        fontSize: 15,
        fontFamily: "Poppins SemiBold",
        textAlign: "center",
    },
});

export default ButtonWithIcon;
