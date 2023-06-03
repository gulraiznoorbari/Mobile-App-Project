import { StyleSheet, View, Text, ScrollView } from "react-native";

import { authentication } from "../firebase/config";
import LoginScreen from "./LoginScreen";
import PlacesSearchBar from "../components/PlacesSearchBar";
import DateRangePicker from "../components/DateRangePicker";
import SquaredButton from "../components/Buttons/SquaredButton";
import HeadingText from "../components/HeadingText";
import DestinationCard from "../components/Cards/DestinationCard";

const HomeScreen = () => {
    return (
        <>
            {!authentication.currentUser ? (
                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Search Section */}
                    <View>
                        <PlacesSearchBar />
                        <DateRangePicker />
                        <SquaredButton text="Search" marginTop={7} padding={8} />
                    </View>

                    {/* Destinations Section */}
                    <View>
                        <HeadingText text="Popular Destinations" />
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <DestinationCard
                                text={"Dubai"}
                                image={require("../assets/images/dubai.jpg")}
                            />
                            <DestinationCard
                                text={"London"}
                                image={require("../assets/images/london.jpg")}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <DestinationCard
                                text={"New York City"}
                                image={require("../assets/images/new_york_city.jpg")}
                            />
                            <DestinationCard
                                text={"Singapore"}
                                image={require("../assets/images/singapore.jpg")}
                            />
                        </View>
                    </View>
                </ScrollView>
            ) : (
                <LoginScreen />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
});

export default HomeScreen;
