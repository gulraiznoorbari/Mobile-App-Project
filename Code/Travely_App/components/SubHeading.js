import { StyleSheet, Text, View } from "react-native";
import FontLoader from "./FontLoader";

const SubHeading = ({ text }) => {
    return (
        <FontLoader>
            <View>
                <Text style={styles.subHeading}>{text}</Text>
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    subHeading: {
        fontSize: 22,
        fontFamily: "Poppins SemiBold",
        textAlign: "center",
        marginHorizontal: 70,
        paddingTop: 20,
        paddingBottom: 10,
    },
});

export default SubHeading;
