import { StyleSheet, Text, View, Image } from "react-native";
import { PlaceHolder } from "../../assets/images";
import StarRating from "react-native-star-rating-widget";

const DetailsCard = () => {
    return (
        <View style={styles.cardContainer}>
            <Image source={PlaceHolder} style={styles.image} resizeMode="cover" />
            <View style={styles.textContainer}>
                <Text style={styles.text}>Dubai</Text>
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
                <Text style={styles.price}>from $1000 per adult</Text>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: "100%",
        backgroundColor: "#cdcdcd",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
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

export default DetailsCard;
