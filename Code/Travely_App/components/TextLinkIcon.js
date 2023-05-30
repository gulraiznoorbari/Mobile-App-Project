import { StyleSheet, Text, View } from "react-native";
import { Link } from "@react-navigation/native";

const TextLinkIcon = ({ text, redirectTo, icon }) => {
    return (
        <Text style={styles.linkText}>
            <Link to={redirectTo}>
                {icon}
                <Text>{text}</Text>
            </Link>
        </Text>
    );
};

export default TextLinkIcon;

const styles = StyleSheet.create({
    linkText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#003580",
    },
});
