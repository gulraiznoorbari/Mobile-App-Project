import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DetailScreen = ({ route }) => {
    const navigation = useNavigation();
    const data = route?.params?.param;
    console.log(data);

    return (
        <View>
            <Text>DetailScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default DetailScreen;
