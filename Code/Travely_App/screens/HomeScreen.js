import { StyleSheet, View, Text, ScrollView } from "react-native";

import { authentication } from "../firebase/config";
import LoginScreen from "./LoginScreen";
import PlacesSearchBar from "../components/PlacesSearchBar";
import DateRangePicker from "../components/DateRangePicker";
import SquaredButton from "../components/Buttons/SquaredButton";
import HeadingText from "../components/HeadingText";
import DestinationCard from "../components/Cards/DestinationCard";
import AttractionsCard from "../components/Cards/AttractionsCard";
import { Dubai, London, NewYorkCity, Singapore } from "../assets/images";

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

                    {/* Popular Destinations Section */}
                    <View>
                        <HeadingText text="Popular Destinations" />
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <DestinationCard text={"Dubai"} image={Dubai} />
                            <DestinationCard text={"London"} image={London} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <DestinationCard text={"New York City"} image={NewYorkCity} />
                            <DestinationCard text={"Singapore"} image={Singapore} />
                        </View>
                    </View>

                    {/* Top Attractions */}
                    <View>
                        <HeadingText text="Top Attractions" />
                        <ScrollView
                            horizontal
                            contentContainerStyle={{
                                flexGrow: 1,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 20,
                            }}
                        >
                            <AttractionsCard />
                            <AttractionsCard />
                            <AttractionsCard />
                            <AttractionsCard />
                        </ScrollView>
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
