import { StyleSheet, Text, View } from "react-native";

const LogoHeader = ({ text }) => {
    return (
        <View style={styles.logoContainer}>
            <Text style={styles.logoHeading}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        padding: 35,
        backgroundColor: "#003580",
        textAlign: "center",
    },
    logoHeading: {
        fontFamily: "Poppins-Bold",
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
    },
});

export default LogoHeader;
