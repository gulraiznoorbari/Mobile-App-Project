import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db, authentication } from "../../firebase/config";
import DatePicker from "../../components/DatePicker";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import FontLoader from "../../components/FontLoader";
import CounterButton from "../../components/Buttons/CounterButton";
import moment from "moment";
import BookingConfirmed from "../../components/BookingConfirmed";

const ConfirmAttractionsBooking = ({ route }) => {
    const { data, date, adults, children, price, totalPrice } = route.params;

    // Initialize states with the passed parameters
    const [dateState, setDateState] = useState(moment(date, "DD/MM/YYYY").toDate());
    const [adultsState, setAdultsState] = useState(adults);
    const [childrenState, setChildrenState] = useState(children);
    const [priceState, setPriceState] = useState(price);
    const [totalPriceState, setTotalPriceState] = useState(totalPrice);
    const [isLoading, setIsLoading] = useState(false);
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

    const decrementAdults = () => {
        if (adultsState > 1) {
            setAdultsState(adultsState - 1);
        }
    };
    const decrementChildren = () => {
        if (childrenState > 1) {
            setChildrenState(childrenState - 1);
        }
    };

    const incrementAdults = () => {
        setAdultsState(adultsState + 1);
    };
    const incrementChildren = () => {
        setChildrenState(childrenState + 1);
    };

    const calculateTotal = () => {
        const totalPrice = adultsState * priceState + childrenState * priceState * 0.5;
        setTotalPriceState(totalPrice);
    };

    useEffect(() => {
        calculateTotal();
    }, [adultsState, childrenState]);

    const confirmBooking = async () => {
        setIsLoading(true);
        const user = authentication.currentUser;
        if (user) {
            const userId = user.uid;
            const bookingRef = collection(db, "Users", userId, "Bookings");
            try {
                const booking = {
                    image: data?.photo?.images?.medium?.url,
                    name: data?.name,
                    rating: data?.rating,
                    location: data?.address_obj?.country,
                    date: moment(dateState).format("DD/MM/YYYY"),
                    adults: adultsState,
                    children: childrenState,
                    price: priceState,
                    totalPrice: totalPriceState,
                };
                await addDoc(bookingRef, booking)
                    .then(() => {
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 2000);
                        setIsBookingConfirmed(true);
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        console.log(error.message);
                    });
            } catch (error) {
                setIsLoading(false);
                console.log(error.message);
            }
        } else {
            setIsLoading(false);
            console.log("User not logged in");
        }
    };

    return (
        <FontLoader>
            <View style={styles.container}>
                <Text style={styles.heading}>Booking Details</Text>
                <View style={styles.dateContainer}>
                    <View style={styles.dateInput}>
                        <Text style={styles.SubHeading}>Booking Date</Text>
                        <DatePicker
                            selectedDate={dateState}
                            onDateChanging={setDateState}
                            placeHolder={date}
                        />
                    </View>
                </View>
                <View style={styles.optionsContainer}>
                    <View style={styles.option}>
                        <Text style={styles.SubHeading}>Adults</Text>
                        <CounterButton
                            subtract={decrementAdults}
                            add={incrementAdults}
                            count={adultsState}
                        />
                    </View>
                    <View style={styles.option}>
                        <Text style={styles.SubHeading}>Children</Text>
                        <CounterButton
                            subtract={decrementChildren}
                            add={incrementChildren}
                            count={childrenState}
                        />
                    </View>
                    <View style={styles.PriceContainer}>
                        <View style={styles.TotalContainer}>
                            <Text style={[styles.SubHeading, { fontSize: 17 }]}>Price</Text>
                            <Text style={styles.personTag}>per person</Text>
                        </View>
                        <Text style={styles.PriceValue}>${priceState}.00</Text>
                    </View>
                    <View style={styles.TotalPriceContainer}>
                        <View style={styles.TotalContainer}>
                            <Text style={styles.heading}>Total</Text>
                        </View>
                        <Text style={styles.TotalValue}>${totalPriceState}.00</Text>
                    </View>
                </View>
                <BookingConfirmed isVisible={isLoading} isBookingConfirmed={isBookingConfirmed} />
                <PrimaryButton
                    text={"Confirm"}
                    marginHorizontal={0}
                    fontSize={16}
                    action={() => confirmBooking()}
                />
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    dateContainer: {
        flexDirection: "row",
        marginTop: 20,
        width: "100%",
    },
    dateInput: {
        flex: 1,
        marginRight: 10,
    },
    optionsContainer: {
        marginTop: 20,
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    heading: {
        fontSize: 20,
        fontFamily: "Poppins-Bold",
    },
    SubHeading: {
        fontSize: 16,
        fontFamily: "Poppins SemiBold",
    },
    PriceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    PriceValue: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: "bold",
    },
    TotalContainer: {
        flexDirection: "column",
    },
    TotalPriceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    TotalValue: {
        fontSize: 20,
        fontWeight: "bold",
    },
    personTag: {
        fontSize: 12,
        color: "#003580",
    },
});

export default ConfirmAttractionsBooking;
