import { Text, TouchableOpacity } from "react-native";
import FontLoader from "../FontLoader";

const PrimaryButton = ({ text, action, marginHorizontal, fontSize }) => {
    return (
        <FontLoader>
            <TouchableOpacity
                style={{
                    backgroundColor: "#003580",
                    padding: 6,
                    marginHorizontal: marginHorizontal,
                    marginTop: 15,
                    borderRadius: 50,
                }}
                onPress={action}
            >
                <Text
                    style={{
                        fontFamily: "Poppins-Bold",
                        fontSize: fontSize ? fontSize : 19,
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

export default PrimaryButton;
