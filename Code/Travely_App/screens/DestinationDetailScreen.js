import { StyleSheet, Text, View, Image, FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PlaceHolder } from "../assets/images";
import ButtonWithIcon from "../components/Buttons/ButtonWithIcon";
import HotelCard from "../components/Cards/HotelCard";
import AttractionsCard from "../components/Cards/AttractionsCard";

const DestinationDetailScreen = ({ route }) => {
    const navigation = useNavigation();
    const data = route?.params?.param;
    console.log(data);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                height: 70,
            },
            headerTitle: "DestinationDetail",
            headerTitleStyle: {
                fontFamily: "Poppins-Bold",
                fontSize: 18,
                marginLeft: 40,
            },
        });
    }, [navigation]);

    const renderHotelsCard = ({ item }) => (
        <HotelCard
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

    const renderAttractionsCard = ({ item }) => (
        <AttractionsCard
            imageSrc={
                item?.photo?.images?.medium?.url
                    ? item?.photo?.images?.medium?.url
                    : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
            }
            title={item?.name}
            rating={item?.rating}
            price={item?.offer_group?.offer_list[0]?.price}
            openStatus={item?.open_now_text}
            location={item?.location_string}
            data={item}
        />
    );

    return (
        <ScrollView>
            <Image source={PlaceHolder} style={styles.image} resizeMode="cover" />
            <View style={styles.container}>
                <Text style={styles.descriptionHeading}>New York City</Text>
                <Text style={styles.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dolorem optio
                    facere unde eum error minus. Corporis eos pariatur porro saepe culpa quaerat
                    atque minima!
                </Text>

                <View style={styles.buttonContainer}>
                    <ButtonWithIcon
                        iconName={"map-marker-outline"}
                        size={22}
                        iconColor={"#fff"}
                        marginRight={7}
                        bgColor={"#003580"}
                        textColor={"#fff"}
                        text={"View Map"}
                        action={() => console.log("Map Opened")}
                    />
                </View>
                <View style={styles.itemsContainer}>
                    <Text style={styles.itemsHeading}>Hotels</Text>
                    <FlatList
                        horizontal
                        contentContainerStyle={{
                            flexGrow: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 20,
                        }}
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderHotelsCard}
                    />
                </View>
                <View style={styles.itemsContainer}>
                    <Text style={styles.itemsHeading}>Attractions</Text>
                    <FlatList
                        horizontal
                        contentContainerStyle={{
                            flexGrow: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 20,
                        }}
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderAttractionsCard}
                    />
                </View>
                <View style={styles.itemsContainer}>
                    <Text style={styles.itemsHeading}>Food</Text>
                    <FlatList
                        horizontal
                        contentContainerStyle={{
                            flexGrow: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 20,
                        }}
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderHotelsCard}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 175,
        marginBottom: 10,
    },
    container: {
        marginHorizontal: 20,
    },
    descriptionHeading: {
        fontFamily: "Poppins-Bold",
        fontSize: 22,
        marginTop: 5,
        marginBottom: 10,
    },
    descriptionText: {
        fontFamily: "Poppins",
        fontSize: 14,
        marginBottom: 10,
    },
    buttonContainer: {
        width: "100%",
        marginBottom: 25,
    },
    itemsHeading: {
        fontFamily: "Poppins-Bold",
        fontSize: 20,
        marginBottom: 5,
    },
});

export default DestinationDetailScreen;
