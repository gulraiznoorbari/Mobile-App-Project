import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { collection, doc, deleteDoc, onSnapshot, query } from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StarRating from "react-native-star-rating-widget";

import { db, authentication } from "../firebase/config";

const WishlistScreen = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const user = authentication.currentUser;
        if (user) {
            const userId = user.uid;
            const favoritesRef = collection(db, "Users", userId, "Favorites");
            const favoritesQuery = query(favoritesRef);
            const unsubscribe = onSnapshot(favoritesQuery, (snapshot) => {
                const favoritesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFavorites(favoritesData);
            });
            return () => unsubscribe();
        }
    }, []);

    const removeFromFavorites = async (itemId) => {
        const user = authentication.currentUser;
        if (user) {
            const userId = user.uid;
            const favoritesRef = doc(db, "Users", userId, "Favorites", itemId);
            try {
                await deleteDoc(favoritesRef);
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    const renderFavoriteCards = () => {
        return favorites.map((favorite, index) => (
            <FavoriteCard
                key={index}
                favorite={favorite}
                removeFromFavorites={removeFromFavorites}
            />
        ));
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>{renderFavoriteCards()}</View>
        </ScrollView>
    );
};

const FavoriteCard = ({ favorite, removeFromFavorites }) => {
    const { id, title, imageSrc, rating, price, location, openStatus } = favorite;

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity
                style={styles.favoriteIconContainer}
                onPress={() => removeFromFavorites(id)}
            >
                <MaterialCommunityIcons name="cards-heart" size={22} color={"#ff0000"} />
            </TouchableOpacity>
            <Image source={{ uri: imageSrc }} style={styles.image} resizeMode="cover" />
            <View style={styles.textContainer}>
                <Text style={styles.text}>{title}</Text>
                <StarRating
                    rating={parseInt(rating)}
                    color="gold"
                    starSize={18}
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
                <Text style={styles.price}>{`from ${price} per adult`}</Text>
                <Text style={styles.description}>{openStatus}</Text>
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
        marginBottom: 10,
    },
    favoriteIconContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
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
        paddingLeft: 5,
    },
    text: {
        fontFamily: "Poppins SemiBold",
        fontSize: 16,
    },
    location: {
        fontFamily: "Poppins SemiBold",
        fontSize: 13,
    },
    price: {
        fontFamily: "Poppins SemiBold",
        fontSize: 12,
    },
    description: {
        fontFamily: "Poppins",
        fontSize: 12,
    },
});

export default WishlistScreen;
