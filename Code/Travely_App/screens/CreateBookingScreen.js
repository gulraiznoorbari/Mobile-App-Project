import { useLayoutEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PlaceHolder } from "../assets/images";
import StarRating from "react-native-star-rating-widget";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontLoader from "../components/FontLoader";
import { ScrollView } from "react-native-gesture-handler";
import PrimaryButton from "../components/Buttons/PrimaryButton";

const CreateBookingScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: "Create Booking",
        });
    }, [navigation]);

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <FontLoader>
                <View style={styles.imagesContainer}>
                    <Image source={PlaceHolder} resizeMode="contain" style={styles.heroImage} />
                    <View style={styles.imagesList}>
                        <Image source={PlaceHolder} resizeMode="cover" style={styles.listImage} />
                        <Image source={PlaceHolder} resizeMode="cover" style={styles.listImage} />
                        <Image source={PlaceHolder} resizeMode="cover" style={styles.listImage} />
                        <Image source={PlaceHolder} resizeMode="cover" style={styles.listImage} />
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Title</Text>
                    <Text style={styles.descriptionText}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                        voluptatum voluptates. Quisquam, voluptatum voluptates.
                    </Text>
                    <Text>CreateBookingScreen</Text>
                    <StarRating
                        rating={3.5}
                        color="gold"
                        starSize={20}
                        starStyle={{
                            paddingLeft: 15,
                            marginLeft: -15,
                            marginTop: -5,
                            width: "10%",
                            height: 20,
                        }}
                        onChange={(rating) => console.log(rating)}
                    />
                </View>
                <View style={styles.bookingContainer}>
                    <View style={styles.bookingHeader}>
                        <Text style={styles.bookingTitle}>Booking Details</Text>
                        <MaterialCommunityIcons
                            name="square-edit-outline"
                            size={24}
                            color="black"
                        />
                    </View>
                    <View style={styles.CheckingText}>
                        <Text style={styles.CheckingInText}>Check In</Text>
                        <Text style={styles.CheckingInValue}>Sat, June 10</Text>
                        <Text style={styles.CheckingOutText}>Check Out</Text>
                        <Text style={styles.CheckingOutValue}>Sat, June 12</Text>
                    </View>
                    <View style={styles.GuestStatusContainer}>
                        <Text style={styles.GuestStatusText}>Rooms and Guests</Text>
                        <Text style={styles.GuestStatusValue}>1 Room, 1 Adult, 0 Children</Text>
                    </View>
                    <View style={styles.RoomTypeContainer}>
                        <Text style={styles.RoomTypeText}>Room Type</Text>
                        <Text style={styles.RoomTypeValue}>Single Bed</Text>
                    </View>
                    <View style={styles.PriceContainer}>
                        <Text style={styles.PriceText}>Price</Text>
                        <Text style={styles.PriceValue}>$40</Text>
                    </View>
                    <View style={styles.TotalContainer}>
                        <Text style={styles.TotalText}>Total</Text>
                        <Text style={styles.TotalValue}>$40</Text>
                    </View>
                </View>
                <PrimaryButton text="Book Now" action={() => navigation.navigate("Home")} />
            </FontLoader>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexGrow: 1,
        justifyContent: "flex-start",
        paddingTop: 20,
    },
    imagesContainer: {
        width: "100%",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    heroImage: {
        width: "100%",
        height: 150,
        borderRadius: 5,
        marginBottom: 10,
    },
    imagesList: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    listImage: {
        width: "23%",
        height: 80,
        borderRadius: 5,
    },
    descriptionContainer: {
        width: "100%",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    descriptionTitle: {
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 14,
        fontFamily: "Poppins",
        marginBottom: 10,
    },
    bookingContainer: {
        width: "100%",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    bookingHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    bookingTitle: {
        fontSize: 20,
        fontFamily: "Poppins SemiBold",
    },
    CheckingText: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    CheckingInText: {
        fontSize: 14,
        fontFamily: "Poppins SemiBold",
    },
    CheckingInValue: {
        fontSize: 12,
        fontFamily: "Poppins",
    },
    CheckingOutText: {
        fontSize: 14,
        fontFamily: "Poppins SemiBold",
    },
    CheckingOutValue: {
        fontSize: 12,
        fontFamily: "Poppins",
    },
    GuestStatusContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    GuestStatusText: {
        fontSize: 14,
        fontFamily: "Poppins SemiBold",
    },
    GuestStatusValue: {
        fontSize: 12,
        fontFamily: "Poppins",
    },
    RoomTypeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    RoomTypeText: {
        fontSize: 14,
        fontFamily: "Poppins SemiBold",
    },
    RoomTypeValue: {
        fontSize: 12,
        fontFamily: "Poppins",
    },
    PriceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    PriceText: {
        fontSize: 14,
        fontFamily: "Poppins SemiBold",
    },
    PriceValue: {
        fontSize: 12,
        fontFamily: "Poppins",
    },
    TotalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    TotalText: {
        fontSize: 14,
        fontFamily: "Poppins SemiBold",
    },
    TotalValue: {
        fontSize: 12,
        fontFamily: "Poppins",
    },
});

export default CreateBookingScreen;
