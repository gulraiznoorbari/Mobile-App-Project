import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { useNavigation } from "@react-navigation/native";

const AttractionsCard = ({ imageSrc, title, rating, price, location, data }) => {
    const navigation = useNavigation();

    return title ? (
        <Pressable
            style={styles.container}
            onPress={() => navigation.navigate("AttractionsDetails", { param: data })}
        >
            <Image source={{ uri: imageSrc }} style={styles.image} resizeMode="cover" />
            <View style={styles.textContainer}>
                <Text style={styles.text}>{title}</Text>
            </View>
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
            <Text style={styles.location}>{location}</Text>
        </Pressable>
    ) : (
        <></>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 130,
        height: 250,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginRight: 12,
    },
    image: {
        width: "100%",
        height: 125,
        borderRadius: 10,
    },
    textContainer: {
        width: "100%",
    },
    text: {
        fontFamily: "Poppins SemiBold",
        fontSize: 16,
        marginTop: 5,
    },
    starRatingsContainer: {
        marginHorizontal: 0,
    },
    price: {
        fontFamily: "Poppins SemiBold",
        fontSize: 12,
    },
    location: {
        fontFamily: "Poppins",
        fontSize: 12,
    },
});

export default AttractionsCard;
