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
                <StarRating
                    rating={4.5}
                    color="gold"
                    starSize={20}
                    starStyle={{
                        padding: 0,
                        marginLeft: 0,
                        marginTop: -5,
                        width: "10%",
                        height: 20,
                    }}
                />
            </View>
            <Text style={styles.price}>from $100 per adult</Text>
        </TouchableOpacity>
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
        marginHorizontal: 0,
    },
    price: {
        fontFamily: "Poppins SemiBold",
        fontSize: 12,
    },
});

export default AttractionsCard;
