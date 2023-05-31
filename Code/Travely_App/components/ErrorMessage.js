import { StyleSheet, Text, View } from "react-native";
import FontLoader from "./FontLoader";

const ErrorMessage = ({ errorMessage, marginVertical }) => {
    return (
        <FontLoader>
            <View style={{ paddingHorizontal: 22, marginVertical: marginVertical }}>
                <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: "red",
        fontFamily: "Poppins",
        fontSize: 14,
        fontWeight: "500",
    },
});

export default ErrorMessage;
