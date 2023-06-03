import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { PlaceHolder } from "../../assets/images";

const AttractionsCard = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image source={PlaceHolder} style={styles.image} resizeMode="cover" />
            <View style={styles.textContainer}>
                <Text style={styles.text}>Hello</Text>
            </View>
            <View style={styles.starRatingsContainer}>
                <StarRating rating={4.5} color="gold" />
            </View>
            <Text style={styles.price}>$100</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 130,
        height: 250,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginRight: 10,
    },
    image: {
        width: "100%",
        height: 150,
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
        width: 50,
        height: 20,
        borderRadius: 10,
    },
    starRatings: {
        fontFamily: "Poppins",
        fontSize: 12,
    },
    price: {
        fontFamily: "Poppins",
        fontSize: 12,
    },
});

export default AttractionsCard;
