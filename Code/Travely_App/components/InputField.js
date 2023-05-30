import { StyleSheet, Text, View, TextInput } from "react-native";

const InputField = ({ label, placeholder, value, setValue }) => {
    return (
        <View style={styles.InputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={"#9B9B9B"}
                value={value}
                onChangeText={setValue}
                keyboardType="email-address"
                style={styles.InputField}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    InputContainer: {
        paddingHorizontal: 20,
    },
    label: {
        top: 15,
        fontSize: 15,
    },
    InputField: {
        fontSize: 14,
        backgroundColor: "#D9D9D9",
        height: 50,
        borderColor: "gray",
        marginTop: 20,
        padding: 15,
    },
});

export default InputField;
