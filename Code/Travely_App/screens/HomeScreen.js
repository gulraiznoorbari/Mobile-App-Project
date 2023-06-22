import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "@env";
import { FontAwesome } from "@expo/vector-icons";
import "expo-dev-client";

import FontLoader from "../components/FontLoader";
import { authentication } from "../firebase/config";
import { getPlacesData } from "../api/travelAdvisorAPI";
import { Dubai, London, NewYorkCity, Singapore } from "../assets/images";
import LoginScreen from "./LoginScreen";
import DateRangePicker from "../components/DateRangePicker";
import SquaredButton from "../components/Buttons/SquaredButton";
import HeadingText from "../components/HeadingText";
import DestinationCard from "../components/Cards/DestinationCard";
import AttractionsCard from "../components/Cards/AttractionsCard";
import GoogleAd from "../components/GoogleAd";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [coordinates, setCoordinates] = useState({
        bl_lat: null,
        bl_lng: null,
        tr_lat: null,
        tr_lng: null,
    });

    useEffect(() => {
        const { bl_lat, bl_lng, tr_lat, tr_lng } = coordinates;
        setIsLoading(true);
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, "attractions").then((data) => {
            setMainData(data);
            setInterval(() => {
                setIsLoading(false);
            }, 2000);
        });
    }, [coordinates]);

    const handleCityPress = (city) => {
        setMainData([]);
        setCoordinates({
            bl_lat: null,
            bl_lng: null,
            tr_lat: null,
            tr_lng: null,
        });
        if (city === "Dubai") {
            setCoordinates({
                bl_lat: 25.0657,
                bl_lng: 55.17128,
                tr_lat: 25.276987,
                tr_lng: 55.296249,
            });
            setIsLoading(true);
            getPlacesData(25.0657, 55.17128, 25.276987, 55.296249, "attractions")
                .then((data) => {
                    setMainData(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log("Error: ", error);
                    setIsLoading(false);
                });
            navigation.navigate("DestinationDetail", { param: mainData });
            setMainData([]);
        } else if (city === "London") {
            setCoordinates({
                bl_lat: 51.5074,
                bl_lng: -0.1278,
                tr_lat: 51.5207,
                tr_lng: -0.0978,
            });
            getPlacesData(51.5074, -0.1278, 51.5207, -0.0978, "attractions")
                .then((data) => {
                    setMainData(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log("Error: ", error);
                    setIsLoading(false);
                });
            navigation.navigate("DestinationDetail", { param: mainData });
            setMainData([]);
        } else if (city === "New York City") {
            setCoordinates({
                bl_lat: 40.7128,
                bl_lng: -74.006,
                tr_lat: 40.7218,
                tr_lng: -73.9973,
            });
            getPlacesData(40.7128, -74.006, 40.7218, -73.9973, "attractions")
                .then((data) => {
                    setMainData(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log("Error: ", error);
                    setIsLoading(false);
                });
            navigation.navigate("DestinationDetail", { param: mainData });
            setMainData([]);
        } else if (city === "Singapore") {
            setCoordinates({
                bl_lat: 1.29027,
                bl_lng: 103.851959,
                tr_lat: 1.3047,
                tr_lng: 103.852,
            });
            getPlacesData(1.29027, 103.851959, 1.3047, 103.852, "attractions")
                .then((data) => {
                    setMainData(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log("Error: ", error);
                    setIsLoading(false);
                });
            navigation.navigate("DestinationDetail", { param: mainData });
            setMainData([]);
        }
    };

    return (
        <>
            {authentication.currentUser ? (
                isLoading ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" color="#003580" />
                    </View>
                ) : (
                    <FontLoader>
                        <ScrollView contentContainerStyle={styles.container}>
                            {/* Search Section */}
                            <View style={styles.placesSearchContainer}>
                                <GooglePlacesAutocomplete
                                    placeholder="Where are you going?"
                                    fetchDetails={true}
                                    onPress={(data, details) => {
                                        setCoordinates((prevCoordinates) => ({
                                            ...prevCoordinates,
                                            bl_lat: details?.geometry?.viewport?.southwest?.lat,
                                            bl_lng: details?.geometry?.viewport?.southwest?.lng,
                                            tr_lat: details?.geometry?.viewport?.northeast?.lat,
                                            tr_lng: details?.geometry?.viewport?.northeast?.lng,
                                        }));
                                    }}
                                    query={{
                                        key: GOOGLE_PLACES_API_KEY,
                                        language: "en",
                                    }}
                                    styles={{
                                        textInputContainer: {
                                            borderWidth: 2,
                                            borderRadius: 10,
                                            paddingHorizontal: 5,
                                            height: 48,
                                            marginTop: 10,
                                        },
                                        textInput: {
                                            backgroundColor: "#fff",
                                            width: "70%",
                                            paddingLeft: 15,
                                            fontSize: 15,
                                            color: "#000",
                                            fontFamily: "Poppins",
                                        },
                                        listView: {
                                            backgroundColor: "#fff",
                                            borderRadius: 5,
                                            width: "90%",
                                            marginHorizontal: 20,
                                            maxHeight: 150,
                                            overflow: "scroll",
                                            zIndex: 1000,
                                        },
                                    }}
                                    renderLeftButton={() => (
                                        <FontAwesome
                                            name="search"
                                            size={19}
                                            color={"#000"}
                                            style={{ marginTop: 11, marginLeft: 10 }}
                                        />
                                    )}
                                />
                            </View>
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
                                <View>
                                    <ScrollView
                                        horizontal
                                        contentContainerStyle={{
                                            flexGrow: 1,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            marginBottom: 20,
                                        }}
                                    >
                                        {mainData.length > 0 ? (
                                            <>
                                                {mainData.map((item, index) => (
                                                    <AttractionsCard
                                                        key={index}
                                                        imageSrc={
                                                            item?.photo?.images?.medium?.url
                                                                ? item?.photo?.images?.medium?.url
                                                                : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                                                        }
                                                        title={item?.name}
                                                        rating={item?.rating}
                                                        price={
                                                            item?.offer_group?.offer_list[0]?.price
                                                        }
                                                        location={item?.location_string}
                                                        openStatus={item?.open_now_text}
                                                        data={item}
                                                    />
                                                ))}
                                            </>
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
                                    </ScrollView>
                                </View>
                            </View>
                            <GoogleAd />
                        </ScrollView>
                    </FontLoader>
                )
            ) : (
                <LoginScreen />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    placesSearchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
    },
});

export default HomeScreen;
