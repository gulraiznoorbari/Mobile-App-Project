import { StyleSheet, Text, TouchableOpacity } from "react-native";
import FontLoader from "../FontLoader";

const PrimaryButton = ({ text, action }) => {
    return (
        <FontLoader>
            <TouchableOpacity style={styles.buttonContainer} onPress={action}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#003580",
        padding: 6,
        marginHorizontal: 20,
        marginTop: 15,
        borderRadius: 50,
    },
    buttonText: {
        fontFamily: "Poppins-Bold",
        fontSize: 19,
        textAlign: "center",
        color: "#fff",
    },
});

export default PrimaryButton;
