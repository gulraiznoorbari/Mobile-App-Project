import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontLoader from "./FontLoader";
import { useNavigation } from "@react-navigation/native";

const MenuOption = ({ icon, text, redirectTo }) => {
    const navigation = useNavigation();

    return (
        <FontLoader>
            <Pressable
                style={styles.menuItemContainer}
                onPress={() => navigation.navigate(redirectTo)}
            >
                <View style={styles.menuItemOptionsContainer}>
                    <MaterialCommunityIcons
                        name={icon}
                        size={26}
                        color={"#000"}
                        style={{
                            marginRight: 10,
                        }}
                    />
                    <Text style={styles.menuItemText}>{text}</Text>
                </View>
                <View style={styles.menuItemOptionsContainer}>
                    <MaterialCommunityIcons name="chevron-right" size={26} color={"#000"} />
                </View>
            </Pressable>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    menuItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
    },

    menuItemOptionsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    menuItemText: {
        fontSize: 16,
        fontFamily: "Poppins-Bold",
    },
});

export default MenuOption;
