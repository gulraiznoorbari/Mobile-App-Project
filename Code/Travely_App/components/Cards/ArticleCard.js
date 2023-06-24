import { StyleSheet, Text, View, Pressable, Image, Linking } from "react-native";

const ArticleCard = ({ articleURL, imageURL, title, description }) => {
    return (
        <Pressable onPress={() => Linking.openURL(articleURL)}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageURL }} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                        {title}
                    </Text>
                    <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
                        {description}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 150,
        height: 225,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginRight: 12,
        padding: 4,
    },
    imageContainer: {
        width: "100%",
        height: "60%",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 10,
    },
    textContainer: {
        width: "100%",
        height: "40%",
        marginTop: 5,
        marginHorizontal: 5,
    },
    title: {
        fontFamily: "Poppins SemiBold",
        fontSize: 12,
    },
    description: {
        fontFamily: "Poppins",
        fontSize: 10,
        marginRight: 10,
    },
});

export default ArticleCard;
