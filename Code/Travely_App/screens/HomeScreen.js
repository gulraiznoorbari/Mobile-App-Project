import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
    const navigation = useNavigation();
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

    const handleCityPress = (city) => {
        switch (city) {
            case "Dubai":
                setBl_lat(25.0657);
                setBl_lng(55.17128);
                setTr_lat(25.276987);
                setTr_lng(55.296249);
                break;
            case "London":
                setBl_lat(51.5074);
                setBl_lng(-0.1278);
                setTr_lat(51.5207);
                setTr_lng(-0.0978);
                break;
            case "New York City":
                setBl_lat(40.7128);
                setBl_lng(-74.006);
                setTr_lat(40.7218);
                setTr_lng(-73.9973);
                break;
            case "Singapore":
                setBl_lat(1.29027);
                setBl_lng(103.851959);
                setTr_lat(1.3047);
                setTr_lng(103.852);
                break;
            default:
                break;
        }
        setIsLoading(true);
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, "attractions")
            .then((data) => {
                setMainData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log("Error: ", error);
                setIsLoading(false);
            });
        navigation.navigate("DestinationDetail", { param: mainData });
    };

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
                                    <DestinationCard
                                        text={"Dubai"}
                                        image={Dubai}
                                        action={() => handleCityPress("Dubai")}
                                    />
                                    <DestinationCard
                                        text={"London"}
                                        image={London}
                                        action={() => handleCityPress("London")}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <DestinationCard
                                        text={"New York City"}
                                        image={NewYorkCity}
                                        action={() => handleCityPress("New York City")}
                                    />
                                    <DestinationCard
                                        text={"Singapore"}
                                        image={Singapore}
                                        action={() => handleCityPress("Singapore")}
                                    />
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
