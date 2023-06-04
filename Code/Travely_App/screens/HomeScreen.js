import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, ScrollView } from "react-native";

import { authentication } from "../firebase/config";
import { getPlacesData } from "../api/travelAdvisorAPI";
import { Dubai, London, NewYorkCity, Singapore } from "../assets/images";
import LoginScreen from "./LoginScreen";
import PlacesSearchBar from "../components/PlacesSearchBar";
import DateRangePicker from "../components/DateRangePicker";
import SquaredButton from "../components/Buttons/SquaredButton";
import HeadingText from "../components/HeadingText";
import DestinationCard from "../components/Cards/DestinationCard";
import AttractionsCard from "../components/Cards/AttractionsCard";

const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, "attractions").then((data) => {
            setMainData(data);
            // console.log(data);
            setInterval(() => {
                setIsLoading(false);
            }, 2000);
        });
    }, [bl_lat, bl_lng, tr_lat, tr_lng]);

    const renderAttractionsCard = ({ item }) => (
        <AttractionsCard
            imageSrc={
                item?.photo?.images?.medium?.url
                    ? item?.photo?.images?.medium?.url
                    : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
            }
            title={item?.name}
            rating={item?.rating}
            price={item?.offer_group?.lowest_price}
            location={item?.location_string}
            data={item}
        />
    );

    return (
        <>
            {!authentication.currentUser ? (
                isLoading ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" color="#003580" />
                    </View>
                ) : (
                    <ScrollView>
                        {/* Search Section */}
                        <View style={styles.container}>
                            <PlacesSearchBar
                                setBl_lat={bl_lat ? bl_lat : setBl_lat}
                                setBl_lng={bl_lng ? bl_lng : setBl_lng}
                                setTr_lat={tr_lat ? tr_lat : setTr_lat}
                                setTr_lng={tr_lng ? tr_lng : setTr_lng}
                            />
                            <DateRangePicker />
                            <SquaredButton text="Search" marginTop={7} padding={8} />
                            {/* Popular Destinations Section */}
                            <View>
                                <HeadingText text="Popular Destinations" />
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <DestinationCard text={"Dubai"} image={Dubai} />
                                    <DestinationCard text={"London"} image={London} />
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <DestinationCard text={"New York City"} image={NewYorkCity} />
                                    <DestinationCard text={"Singapore"} image={Singapore} />
                                </View>
                            </View>
                            {/* Top Attractions */}
                            <View>
                                <HeadingText text="Top Attractions" />
                                {mainData.length > 0 ? (
                                    <FlatList
                                        horizontal
                                        contentContainerStyle={{
                                            flexGrow: 1,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            marginBottom: 20,
                                        }}
                                        data={mainData}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={renderAttractionsCard}
                                    />
                                ) : (
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text>Oops...No Data Found</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </ScrollView>
                )
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
