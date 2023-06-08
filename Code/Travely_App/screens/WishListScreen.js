import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { collection, addDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db, authentication } from "../firebase/config";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StarRating from "react-native-star-rating-widget";

const FavoritesListScreen = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const user = authentication.currentUser;
        if (user) {
            const userId = user.uid;
            const favoritesRef = collection(db, "Users", userId, "Favorites");
            const unsubscribe = onSnapshot(favoritesRef, (snapshot) => {
                const favoritesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFavorites(favoritesData);
            });

            return () => unsubscribe();
        }
    }, []);

    const addToFavorites = async (item) => {
        const user = authentication.currentUser;
        if (user) {
            const userId = user.uid;
            const favoritesRef = collection(db, "Users", userId, "Favorites");
            try {
                await addDoc(favoritesRef, item);
            } catch (error) {
                console.log(error.message);
            }
        }
    };

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

    const toggleFavorite = (itemId) => {
        const isFavorite = favorites.some((item) => item.id === itemId);
        if (isFavorite) {
            removeFromFavorites(itemId);
        } else {
            const item = { id: itemId };
            addToFavorites(item);
        }
    };

    const renderFavoriteCards = () => {
        return favorites.map((favorite) => (
            <FavoriteCard
                key={favorite.id}
                favorite={favorite}
                onRemove={() => removeFromFavorites(favorite.id)}
            />
        ));
    };

    return <View style={styles.container}>{renderFavoriteCards()}</View>;
};

const FavoriteCard = ({ favorite, onRemove }) => {
    const { id, location, price, description } = favorite;
    const [isFavorite, setIsFavorite] = useState(true);

    const handleToggleFavorite = () => {
        toggleFavorite(id);
        setIsFavorite(!isFavorite);
    };

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.favoriteIconContainer} onPress={handleToggleFavorite}>
                {isFavorite ? (
                    <MaterialCommunityIcons name="cards-heart" size={20} color={"#000"} />
                ) : (
                    <MaterialCommunityIcons name="cards-heart-outline" size={20} color={"#000"} />
                )}
            </TouchableOpacity>
            <Image source={PlaceHolder} style={styles.image} resizeMode="cover" />
            <View style={styles.textContainer}>
                <Text style={styles.text}>{location}</Text>
                <StarRating
                    rating={4}
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
                <Text style={styles.location}>United Arab Emirates</Text>
                <Text style={styles.price}>{`from $${price} per adult`}</Text>
                <Text style={styles.description}>{description}</Text>
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
        height: 150,
        marginLeft: 10,
        borderRadius: 10,
    },
    textContainer: {
        flexDirection: "column",
        width: "100%",
        padding: 10,
    },
    text: {
        fontFamily: "Poppins SemiBold",
        fontSize: 18,
    },
    location: {
        fontFamily: "Poppins SemiBold",
        fontSize: 13,
    },
    price: {
        fontFamily: "Poppins SemiBold",
        fontSize: 13,
    },
    description: {
        fontFamily: "Poppins",
        fontSize: 12,
        marginTop: 3,
        width: "60%",
    },
});

export default FavoritesListScreen;
