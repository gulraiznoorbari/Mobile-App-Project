import { useLayoutEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating-widget";

import FontLoader from "../components/FontLoader";
import { PlaceHolder } from "../assets/images";
import PrimaryButton from "../components/Buttons/PrimaryButton";

const CreateBookingScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: "Create Booking",
            headerTitleStyle: {
                fontFamily: "Poppins-Bold",
                fontSize: 20,
            },
            headerRight: () => (
                <MaterialCommunityIcons
                    name="cards-heart-outline"
                    size={25}
                    color="#fff"
                    onPress={() => addToWishlist(data)}
                />
            ),
            headerRightContainerStyle: {
                marginRight: 25,
            },
        });
    }, [navigation]);

    const addToWishlist = (data) => {
        console.log("Add to Wishlist");
        // add data to a wishlist collection in a user document in firestore:
        // 1. get the current user
        // 2. get the user's wishlist collection
        // 3. add the data to the wishlist collection

        // 1. get the current user
        // const user = auth.currentUser;

        // // 2. get the user's wishlist collection
        // const wishlistRef = firestore
        //     .collection("users") // users collection
        //     .doc(user.uid) // user document
        //     .collection("wishlist"); // wishlist collection

        // // 3. add the data to the wishlist collection
        // wishlistRef.add(data);

        // // 4. show a toast message
        // Toast.show({
        //     type: "success",
        //     position: "bottom",
        //     text1: "Added to Wishlist",
        //     text2: "Destination added to your wishlist",
        //     visibilityTime: 2000,
        //     autoHide: true,
        //     bottomOffset: 60,
        // });
    };

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
                    <StarRating
                        rating={3.5}
                        color="gold"
                        starSize={20}
                        starStyle={{
                            paddingLeft: 15,
                            marginLeft: -15,
                            marginTop: -10,
                            width: "10%",
                            height: 15,
                        }}
                        onChange={(rating) => console.log(rating)}
                    />
                </View>
                <View style={styles.bookingContainer}>
                    <View style={styles.bookingHeader}>
                        <Text style={styles.bookingTitle}>Booking Details</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("EditBooking")}>
                            <MaterialCommunityIcons
                                name="square-edit-outline"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.CheckingContainer}>
                        <View style={styles.CheckingTextContainer}>
                            <Text style={styles.CheckingInText}>Check In</Text>
                            <Text style={styles.CheckingInValue}>Sat, June 10</Text>
                        </View>
                        <View style={styles.CheckingTextContainer}>
                            <Text style={styles.CheckingOutText}>Check Out</Text>
                            <Text style={styles.CheckingOutValue}>Sat, June 12</Text>
                        </View>
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
                <PrimaryButton
                    text="Book Now"
                    action={() => navigation.navigate("Home")}
                    marginHorizontal={0}
                />
                <View style={styles.policyContainer}>
                    <Text style={styles.policyText}>Google Ad Here</Text>
                </View>
            </FontLoader>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexGrow: 1,
        justifyContent: "flex-start",
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    imagesContainer: {
        width: "100%",
        marginBottom: 20,
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
    },
    descriptionTitle: {
        fontSize: 22,
        fontFamily: "Poppins-Bold",
    },
    descriptionText: {
        fontSize: 14,
        fontFamily: "Poppins",
        marginBottom: 10,
    },
    bookingContainer: {
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 5,
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
    CheckingTextContainer: {
        flexDirection: "column",
    },
    CheckingContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginLeft: -50,
        marginBottom: 10,
    },
    CheckingInText: {
        fontSize: 14,
        fontFamily: "Poppins SemiBold",
    },
    CheckingInValue: {
        fontSize: 12,
        fontFamily: "Poppins",
        color: "#003580",
    },
    CheckingOutText: {
        fontSize: 14,
        fontFamily: "Poppins SemiBold",
    },
    CheckingOutValue: {
        fontSize: 12,
        fontFamily: "Poppins",
        color: "#003580",
    },
    GuestStatusContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    GuestStatusText: {
        fontSize: 14,
        fontFamily: "Poppins SemiBold",
    },
    GuestStatusValue: {
        fontSize: 12,
        fontFamily: "Poppins",
        color: "#003580",
    },
    RoomTypeContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    RoomTypeText: {
        fontSize: 14,
        fontFamily: "Poppins SemiBold",
    },
    RoomTypeValue: {
        fontSize: 12,
        fontFamily: "Poppins",
        color: "#003580",
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
        fontSize: 15,
        fontFamily: "Poppins-Bold",
        color: "#003580",
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
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        color: "#003580",
    },
    policyContainer: {
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
});

export default CreateBookingScreen;
