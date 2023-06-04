import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HotelCard = ({ imageSrc, title, rating, price, location, data }) => {
    const navigation = useNavigation();

    return title && price && location ? (
        <Pressable
            style={styles.container}
            onPress={() => navigation.navigate("CreateBooking", { param: data })}
        >
            <Image source={{ uri: imageSrc }} style={styles.image} resizeMode="cover" />
            <Text style={styles.text}>{title}</Text>
            <MaterialCommunityIcons
                name="heart-outline"
                size={22}
                color="black"
                style={styles.iconContainer}
            />
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
            <Text style={styles.location}>{location}</Text>
            <Text style={styles.price}>from {price} per night</Text>
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
        width: "85%",
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
        width: "90%",
        fontFamily: "Poppins SemiBold",
        fontSize: 12,
    },
    location: {
        fontFamily: "Poppins",
        fontSize: 12,
    },
});

export default HotelCard;
