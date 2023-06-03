import { StyleSheet, View } from "react-native";

import { authentication } from "../firebase/config";
import LoginScreen from "./LoginScreen";
import PlacesSearchBar from "../components/PlacesSearchBar";
import DateRangePicker from "../components/DateRangePicker";
import SquaredButton from "../components/Buttons/SquaredButton";

const HomeScreen = () => {
    return (
        <>
            {!authentication.currentUser ? (
                <View style={styles.container}>
                    <View style={styles.searchSection}>
                        <PlacesSearchBar />
                        <DateRangePicker />
                        <SquaredButton text="Search" marginTop={7} padding={8} />
                    </View>
                </View>
            ) : (
                <LoginScreen />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default HomeScreen;
