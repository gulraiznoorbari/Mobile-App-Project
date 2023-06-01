import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import FontLoader from "./FontLoader";
import ButtonWithIcon from "./ButtonWithIcon";
import placeholder_image from "../assets/images/placeholder_image.jpg";

const CustomHomeHeader = () => {
    const navigation = useNavigation();

    return (
        <FontLoader>
            <View style={styles.container}>
                <Text style={styles.heading}>Explore</Text>
                <Pressable onPress={() => navigation.navigate("Profile")}>
                    <Image source={placeholder_image} style={styles.profileImage} />
                </Pressable>
            </View>
            <View style={styles.heroButtonContainer}>
                <ButtonWithIcon
                    iconName={"bed-outline"}
                    size={24}
                    marginRight={6}
                    text={"Hotels"}
                    action={() => null}
                />
                <ButtonWithIcon
                    iconName={"ticket-confirmation-outline"}
                    size={24}
                    marginRight={3}
                    text={"Things to do"}
                    action={() => null}
                />
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 22,
        paddingVertical: 20,
        backgroundColor: "#003580",
        textAlign: "center",
    },
    heading: {
        fontSize: 28,
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        color: "#fff",
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 50,
    },
    heroButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 18,
        paddingHorizontal: 20,
        backgroundColor: "#003580",
        textAlign: "center",
    },
});

export default CustomHomeHeader;
