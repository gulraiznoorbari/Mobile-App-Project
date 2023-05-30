import { StyleSheet, Text, View } from "react-native";

const SubHeading = ({ text }) => {
    return (
        <View>
            <Text style={styles.subHeading}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    subHeading: {
        fontSize: 24,
        fontWeight: "800",
        textAlign: "center",
        marginHorizontal: 70,
        paddingTop: 20,
        paddingBottom: 15,
    },
});

export default SubHeading;
