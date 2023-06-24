import { useState } from "react";
import { StyleSheet, Text, Pressable, View, Image, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { collection, deleteDoc, addDoc } from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { db, authentication } from "../../firebase/config";

const AttractionsCard = ({ imageSrc, title, rating, price, location, openStatus, data }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigation = useNavigation();

    const toggleFavorite = async () => {
        setIsFavorite(!isFavorite);
        const user = authentication.currentUser;
        if (user) {
            const userId = user.uid;
            const favoritesRef = collection(db, "Users", userId, "Favorites");
            if (isFavorite) {
                try {
                    await deleteDoc(favoritesRef);
                    setIsFavorite(false);
                    console.log("Removed from favorites.");
                } catch (error) {
                    console.log("Error removing from favorites:", error);
                }
            } else {
                try {
                    const booking = {
                        title: title,
                        imageSrc: imageSrc,
                        rating: rating,
                        price: price,
                        location: location,
                        openStatus: openStatus,
                    };
                    await addDoc(favoritesRef, booking);
                    setIsFavorite(true);
                    console.log("Added to favorites.");
                } catch (error) {
                    console.log("Error adding to favorites:", error);
                }
            }
        }
    };

    return title && price ? (
        <Pressable
            style={styles.container}
            onPress={() => navigation.navigate("CreateAttractionBooking", { param: data })}
        >
            <Image source={{ uri: imageSrc }} style={styles.image} resizeMode="cover" />
            <Text style={styles.text}>
                {title?.length > 14 ? `${title.slice(0, 13)}...` : title}
            </Text>
            <TouchableOpacity style={styles.iconContainer} onPress={() => toggleFavorite()}>
                <MaterialCommunityIcons
                    name={isFavorite ? "heart" : "heart-outline"}
                    size={22}
                    color={isFavorite ? "red" : "#000"}
                />
            </TouchableOpacity>
            <View style={styles.starRatingsContainer}>
                <StarRating
                    rating={rating}
                    color="gold"
                    starSize={20}
                    starStyle={{
                        padding: 0,
                        marginLeft: 0,
                        marginTop: -5,
                        width: "10%",
                        height: 20,
                    }}
                    onChange={(rating) => console.log(rating)}
                />
            </View>
            <Text style={styles.price}>from {price} per adult</Text>
            {openStatus ? <Text style={styles.status}>{openStatus}</Text> : <></>}
            <Text style={styles.location}>
                {location?.length > 20 ? `${location.slice(0, 18)}...` : location}
            </Text>
        </Pressable>
    ) : (
        <></>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 250,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginRight: 12,
        padding: 3,
    },
    image: {
        width: "100%",
        height: 125,
        borderRadius: 10,
    },
    text: {
        width: "90%",
        fontFamily: "Poppins SemiBold",
        fontSize: 14,
        marginTop: 5,
    },
    iconContainer: {
        position: "absolute",
        right: 5,
        top: 135,
    },
    starRatingsContainer: {
        marginHorizontal: 0,
    },
    price: {
        fontFamily: "Poppins SemiBold",
        fontSize: 12,
    },
    status: {
        fontFamily: "Poppins",
        fontSize: 12,
    },
    location: {
        fontFamily: "Poppins",
        fontSize: 12,
    },
});

export default AttractionsCard;
