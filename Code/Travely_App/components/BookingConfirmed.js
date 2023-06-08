import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import TextLink from "./TextLink";

const BookingConfirmed = ({ isVisible, isBookingConfirmed }) => {
    return (
        <View>
            {isVisible && !isBookingConfirmed ? (
                <Modal
                    isVisible={isVisible}
                    style={{
                        backgroundColor: "white",
                        marginVertical: 190,
                        borderRadius: 10,
                    }}
                >
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#003580" />
                        <Text style={styles.loadingText}>Booking...</Text>
                    </View>
                </Modal>
            ) : (
                <Modal
                    isVisible={isBookingConfirmed}
                    style={{
                        backgroundColor: "white",
                        marginVertical: 190,
                        borderRadius: 10,
                    }}
                >
                    <View style={styles.modalContainer}>
                        <MaterialCommunityIcons
                            name="check-decagram-outline"
                            size={120}
                            color="#003580"
                            style={styles.icon}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Booking Successful</Text>
                            <TextLink text={"Return to Home"} redirectTo={"/Home"} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        fontFamily: "Poppins-Bold",
    },
    modalContainer: {
        backgroundColor: "white",
        borderRadius: 10,
    },
    icon: {
        alignSelf: "center",
        marginTop: -20,
    },
    textContainer: {
        marginTop: 10,
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontFamily: "Poppins-Bold",
    },
});

export default BookingConfirmed;
