import { StyleSheet, Text } from "react-native";
import { Link } from "@react-navigation/native";
import FontLoader from "./FontLoader";

const TextLink = ({ text, redirectTo }) => {
    return (
        <FontLoader>
            <Text style={styles.linkText}>
                <Link to={redirectTo}>
                    <Text>{text}</Text>
                </Link>
            </Text>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    linkText: {
        fontSize: 14,
        fontFamily: "Poppins",
        fontWeight: "500",
        color: "#003580",
    },
});

export default TextLink;
