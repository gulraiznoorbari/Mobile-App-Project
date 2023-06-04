import { StyleSheet, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ButtonWithIcon = ({
    iconName,
    size,
    marginRight,
    bgColor,
    text,
    textColor,
    iconColor,
    action,
}) => {
    return (
        <Pressable
            style={{
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: bgColor ? bgColor : "#fff",
                padding: 6,
                borderRadius: 40,
                width: 150,
            }}
            onPress={action}
        >
            <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={iconColor ? iconColor : "#000"}
                style={{ marginRight: marginRight }}
            />
            <Text
                style={{
                    fontSize: 15,
                    fontFamily: "Poppins SemiBold",
                    color: textColor ? textColor : "#000",
                    textAlign: "center",
                }}
            >
                {text}
            </Text>
        </Pressable>
    );
};

export default ButtonWithIcon;
