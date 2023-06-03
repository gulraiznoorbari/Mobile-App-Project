import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DetailsCard from "../components/Cards/DetailsCard";
import { ScrollView } from "react-native-gesture-handler";

const AttractionScreen = ({ route }) => {
    const navigation = useNavigation();
    const data = route?.params?.param;
    console.log(data);

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <Text>DetailScreen</Text>
            <DetailsCard />
            <DetailsCard />
            <DetailsCard />
            <DetailsCard />
            <DetailsCard />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
        marginHorizontal: 20,
    },
});

export default AttractionScreen;
