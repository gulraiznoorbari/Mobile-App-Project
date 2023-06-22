import { Image, StyleSheet, Text, View, ImageBackground } from "react-native";
import { Ad_Background, Google } from "../assets/images";
// import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

// const adUnitId = __DEV__ ? TestIds.BANNER : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy";

// const GoogleAd = () => {
//     return (
//         <View>
//             <BannerAd
//                 unitId={adUnitId}
//                 size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
//                 requestOptions={{
//                     requestNonPersonalizedAdsOnly: true,
//                 }}
//             />
//         </View>
//     );
// };

const GoogleAd = () => {
    return (
        <ImageBackground source={Ad_Background} style={styles.imageContainer}>
            <View style={styles.tintOverlay} />
            <Image source={Google} style={styles.googleImg} />
            <Text style={styles.adText}>Google Ad</Text>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: "100%",
        height: 100,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 20,
    },
    tintOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    googleImg: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    adText: {
        fontSize: 20,
        color: "#fff",
        fontFamily: "Poppins-Bold",
    },
});

export default GoogleAd;
