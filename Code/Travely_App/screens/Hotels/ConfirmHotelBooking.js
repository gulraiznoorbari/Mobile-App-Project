import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db, authentication } from "../../firebase/config";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "../../components/DatePicker";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import FontLoader from "../../components/FontLoader";
import CounterButton from "../../components/Buttons/CounterButton";
import moment from "moment";
import BookingConfirmed from "../../components/BookingConfirmed";

const ConfirmHotelBooking = ({ route }) => {
    const {
        data,
        checkInDate,
        checkOutDate,
        rooms,
        children,
        adults,
        roomType,
        roomPrice,
        totalPrice,
    } = route.params;

    const [roomState, setRoomState] = useState(rooms);
    const [adultState, setAdultState] = useState(adults);
    const [childrenState, setChildrenState] = useState(children);
    const [priceState, setPriceState] = useState(roomPrice);
    const [totalState, setTotalState] = useState(totalPrice);
    const [checkInDateState, setCheckInDateState] = useState(
        moment(checkInDate, "DD/MM/YYYY").toDate(),
    );
    const [checkOutDateState, setCheckOutDateState] = useState(
        moment(checkOutDate, "DD/MM/YYYY").toDate(),
    );
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [items, setItems] = useState([
        { label: "Standard", value: "Standard" },
        { label: "Luxury", value: "Luxury" },
    ]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(items[0].label);
    const [isLoading, setIsLoading] = useState(false);
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

    const decrementRoom = () => {
        if (roomState > 1) {
            setRoomState(roomState - 1);
        }
    };
    const decrementAdults = () => {
        if (adultState > 1) {
            setAdultState(adultState - 1);
        }
    };
    const decrementChildren = () => {
        if (childrenState > 1) {
            setChildrenState(childrenState - 1);
        }
    };

    const incrementRoom = () => {
        setRoomState(roomState + 1);
    };
    const incrementAdults = () => {
        setAdultState(adultState + 1);
    };
    const incrementChildren = () => {
        setChildrenState(childrenState + 1);
    };

    const calculateNumberOfDays = () => {
        if (!checkInDateState || !checkOutDateState) {
            console.log("No dates selected");
        }
        const startDate = parseInt(moment(checkInDateState).format("DD"), 10);
        const endDate = parseInt(moment(checkOutDateState).format("DD"), 10);
        const numberOfDays = endDate - startDate;
        return numberOfDays;
    };

    useEffect(() => {
        const calculatedNumberOfDays = calculateNumberOfDays();
        setNumberOfDays(calculatedNumberOfDays);
    }, [checkInDateState, checkOutDateState]);

    const calculateTotal = () => {
        const totalPrice = numberOfDays * (roomState * priceState);
        setTotalState(totalPrice);
    };

    useEffect(() => {
        calculateTotal();
    }, [numberOfDays, roomState]); // Call calculateTotal whenever room, adults, or children changes

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
                    roomState: roomState,
                    roomType: roomType,
                    adultState: adultState,
                    childrenState: childrenState,
                    checkInDateState: moment(checkInDateState).format("DD/MM/YYYY"),
                    checkOutDateState: moment(checkOutDateState).format("DD/MM/YYYY"),
                    numberOfDays: numberOfDays,
                    priceState: priceState,
                    totalState: totalState,
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
                        <Text style={styles.SubHeading}>Check In</Text>
                        <DatePicker
                            selectedDate={checkInDateState}
                            onDateChanging={setCheckInDateState}
                        />
                    </View>
                    <View style={styles.dateInput}>
                        <Text style={styles.SubHeading}>Check Out</Text>
                        <DatePicker
                            selectedDate={checkOutDateState}
                            onDateChanging={setCheckOutDateState}
                        />
                    </View>
                </View>
                <View style={styles.optionsContainer}>
                    <View style={styles.option}>
                        <Text style={styles.SubHeading}>Rooms</Text>
                        <CounterButton
                            subtract={decrementRoom}
                            add={incrementRoom}
                            count={roomState}
                        />
                    </View>
                    <View style={styles.option}>
                        <Text style={styles.SubHeading}>Adults</Text>
                        <CounterButton
                            subtract={decrementAdults}
                            add={incrementAdults}
                            count={adultState}
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
                    <View style={styles.option}>
                        <Text style={styles.SubHeading}>Room Type</Text>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            textStyle={{
                                fontSize: 14,
                                fontFamily: "Poppins",
                                zIndex: 100000,
                            }}
                            containerStyle={{
                                width: 180,
                                zIndex: 100000,
                            }}
                        />
                    </View>
                    <View style={styles.PriceContainer}>
                        <View style={styles.TotalContainer}>
                            <Text style={[styles.SubHeading, { fontSize: 17 }]}>Price</Text>
                            <Text style={styles.daysRent}>per night</Text>
                        </View>
                        <Text style={styles.PriceValue}>${priceState}</Text>
                    </View>
                    <View style={styles.TotalPriceContainer}>
                        <View style={styles.TotalContainer}>
                            <Text style={styles.heading}>Total</Text>
                            <Text style={styles.daysRent}>for {numberOfDays} days</Text>
                        </View>
                        <Text style={styles.TotalValue}>${totalState}</Text>
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
        marginTop: 80,
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
    daysRent: {
        fontSize: 12,
        color: "#003580",
    },
    TotalValue: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default ConfirmHotelBooking;
