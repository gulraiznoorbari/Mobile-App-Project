import { StyleSheet, Text, View } from "react-native";

const ErrorMessage = ({ errorMessage, marginVertical }) => {
    return (
        <View style={{ paddingHorizontal: 22, marginVertical: marginVertical }}>
            <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: "red",
        fontSize: 14,
        fontWeight: "500",
    },
});

export default ErrorMessage;
