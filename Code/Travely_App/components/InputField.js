import { StyleSheet, Text, View, TextInput } from "react-native";
import FontLoader from "./FontLoader";

const InputField = ({ label, placeholder, value, setValue, hideInput }) => {
    return (
        <FontLoader>
            <View style={styles.InputContainer}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={"#9B9B9B"}
                    value={value}
                    onChangeText={setValue}
                    secureTextEntry={hideInput}
                    style={styles.InputField}
                />
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    InputContainer: {
        paddingHorizontal: 20,
    },
    label: {
        top: 15,
        fontSize: 15,
        fontFamily: "Poppins",
    },
    InputField: {
        fontSize: 14,
        fontFamily: "Poppins",
        backgroundColor: "#D9D9D9",
        height: 50,
        borderColor: "gray",
        marginTop: 20,
        padding: 15,
    },
});

export default InputField;
