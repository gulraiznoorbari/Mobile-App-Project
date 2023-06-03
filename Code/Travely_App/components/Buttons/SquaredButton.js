import { StyleSheet, Text, TouchableOpacity } from "react-native";
import FontLoader from "../FontLoader";

const SquaredButton = ({ text, action, marginTop, padding }) => {
    return (
        <FontLoader>
            <TouchableOpacity
                style={{
                    backgroundColor: "#003580",
                    padding: padding,
                    marginTop: marginTop,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#000",
                }}
                onPress={action}
            >
                <Text
                    style={{
                        fontFamily: "Poppins SemiBold",
                        fontSize: 16,
                        textAlign: "center",
                        color: "#fff",
                    }}
                >
                    {text}
                </Text>
            </TouchableOpacity>
        </FontLoader>
    );
};

export default SquaredButton;
