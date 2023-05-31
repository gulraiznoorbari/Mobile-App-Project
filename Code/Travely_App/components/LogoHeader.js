import { StyleSheet, Text, View } from "react-native";
import FontLoader from "./FontLoader";

const LogoHeader = ({ text }) => {
    return (
        <FontLoader>
            <View style={styles.logoContainer}>
                <Text style={styles.logoHeading}>{text}</Text>
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        padding: 30,
        backgroundColor: "#003580",
        textAlign: "center",
    },
    logoHeading: {
        fontSize: 30,
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        color: "#fff",
    },
});

export default LogoHeader;
