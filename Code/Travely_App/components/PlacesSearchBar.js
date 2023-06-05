import { StyleSheet, View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "@env";
import { FontAwesome } from "@expo/vector-icons";
import FontLoader from "./FontLoader";

const PlacesSearchBar = ({ setBl_lat, setBl_lng, setTr_lat, setTr_lng }) => {
    return (
        <FontLoader>
            <View style={styles.placesSearchContainer}>
                <GooglePlacesAutocomplete
                    placeholder="Where are you going?"
                    fetchDetails={true}
                    onPress={(data, details) => {
                        // 'details' is provided when fetchDetails = true
                        // console.log(data, details);
                        console.log(details?.geometry?.viewport);
                        setBl_lat(details?.geometry?.viewport?.southwest?.lat);
                        setBl_lng(details?.geometry?.viewport?.southwest?.lng);
                        setTr_lat(details?.geometry?.viewport?.northeast?.lat);
                        setTr_lng(details?.geometry?.viewport?.northeast?.lng);
                    }}
                    query={{
                        key: GOOGLE_PLACES_API_KEY,
                        language: "en",
                    }}
                    styles={{
                        textInputContainer: {
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 5,
                            height: 48,
                            marginTop: 20,
                        },
                        textInput: {
                            backgroundColor: "#fff",
                            width: "70%",
                            paddingLeft: 15,
                            fontSize: 15,
                            color: "#000",
                            fontFamily: "Poppins",
                        },
                        listView: {
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            width: "75%",
                            marginHorizontal: 20,
                            elevation: 5,
                            maxHeight: 150,
                            overflow: "scroll",
                            zIndex: 1000,
                        },
                    }}
                    renderLeftButton={() => (
                        <FontAwesome
                            name="search"
                            size={19}
                            color={"#000"}
                            style={{ marginTop: 11, marginLeft: 10 }}
                        />
                    )}
                />
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    placesSearchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
    },
});

export default PlacesSearchBar;
