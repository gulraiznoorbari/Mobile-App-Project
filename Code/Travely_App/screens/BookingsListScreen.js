import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Share, TouchableOpacity, ScrollView } from "react-native";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db, authentication } from "../firebase/config";
import StarRating from "react-native-star-rating-widget";
import { Ionicons } from "@expo/vector-icons";

const BookingListScreen = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const user = authentication.currentUser;
        if (user) {
            const userId = user.uid;
            const bookingsRef = collection(db, "Users", userId, "Bookings");
            const bookingsQuery = query(bookingsRef);
            const unsubscribe = onSnapshot(bookingsQuery, (snapshot) => {
                const bookingsData = snapshot.docs.map((doc) => doc.data());
                setBookings(bookingsData);
            });

            return () => unsubscribe();
        }
    }, []);

    const renderBookingCards = () => {
        return bookings.map((booking, index) => <DetailsCard key={index} booking={booking} />);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>{renderBookingCards()}</View>
        </ScrollView>
    );
};

const DetailsCard = ({ booking }) => {
    const { image, name, location, rating, totalPrice } = booking;

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `TRAVELY Booking Info \n Image: ${image} \n Name: ${name} \n Location: ${location} \n Rating: ${rating} \n Total Price: ${
                    "$" + totalPrice
                }`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("shared with activity type of: ", result.activityType);
                } else {
                    console.log("shared");
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("dismissed");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <View style={styles.cardContainer}>
            <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
            <View style={styles.textContainer}>
                <TouchableOpacity onPress={onShare}>
                    <Ionicons name="share-outline" size={22} color="#000" style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.heading}>{name}</Text>
                <Text style={styles.text}>{location}</Text>
                <StarRating
                    rating={parseInt(rating)}
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
                <Text style={styles.location}>{location}</Text>
                <Text style={styles.price}>Total: ${totalPrice}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    cardContainer: {
        width: "100%",
        backgroundColor: "#cdcdcd",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    icon: {
        position: "absolute",
        left: 175,
        top: -3,
    },

    image: {
        width: 100,
        height: 140,
        margin: 5,
        borderRadius: 10,
    },
    textContainer: {
        flexDirection: "column",
        width: "100%",
        padding: 5,
    },
    heading: {
        fontFamily: "Poppins-Bold",
        fontSize: 16,
        width: "60%",
    },
    text: {
        fontFamily: "Poppins SemiBold",
        fontSize: 14,
    },
    location: {
        fontFamily: "Poppins SemiBold",
        fontSize: 13,
    },
    price: {
        fontFamily: "Poppins SemiBold",
        fontSize: 13,
    },
});

export default BookingListScreen;
