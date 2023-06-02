import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "@env";

const PlacesSearchBar = () => {
    return (
        <View style={styles.placesSearchContainer}>
            <GooglePlacesAutocomplete
                placeholder="Search"
                fetchDetails={true}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: "en",
                }}
                styles={{
                    textInputContainer: {
                        marginHorizontal: 20,
                    },
                    textInput: {
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        height: 45,
                        width: "70%",
                        borderColor: "#000",
                        borderWidth: 2,
                        marginTop: 20,
                        paddingLeft: 20,
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
                    },
                }}
            />
        </View>
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
