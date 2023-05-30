import { StyleSheet, Text } from "react-native";
import { Link } from "@react-navigation/native";

const TextLink = ({ text, redirectTo }) => {
    return (
        <Text style={styles.linkText}>
            <Link to={redirectTo}>
                <Text>{text}</Text>
            </Link>
        </Text>
    );
};

const styles = StyleSheet.create({
    linkText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#003580",
    },
});

export default TextLink;
