import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "../../components/DatePicker";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import FontLoader from "../../components/FontLoader";
import CounterButton from "../../components/Buttons/CounterButton";
import moment from "moment";

const EditHotelBooking = () => {
    const [room, setRoom] = useState(1);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [price, setPrice] = useState(100);
    const [total, setTotal] = useState(0);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [numberOfDays, setNumberOfDays] = useState(0);

    const [items, setItems] = useState([
        { label: "Standard", value: "Standard" },
        { label: "Luxury", value: "Luxury" },
    ]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(items[0].label);

    const decrementRoom = () => {
        if (room > 1) {
            setRoom(room - 1);
        }
    };
    const decrementAdults = () => {
        if (adults > 1) {
            setAdults(adults - 1);
        }
    };
    const decrementChildren = () => {
        if (children > 1) {
            setChildren(children - 1);
        }
    };

    const incrementRoom = () => {
        setRoom(room + 1);
    };
    const incrementAdults = () => {
        setAdults(adults + 1);
    };
    const incrementChildren = () => {
        setChildren(children + 1);
    };

    const calculateNumberOfDays = () => {
        if (!checkInDate || !checkOutDate) {
            console.log("No dates selected");
        }
        const startDate = parseInt(moment(checkInDate).format("DD"), 10);
        const endDate = parseInt(moment(checkOutDate).format("DD"), 10);
        const numberOfDays = endDate - startDate;
        return numberOfDays;
    };

    useEffect(() => {
        const calculatedNumberOfDays = calculateNumberOfDays();
        setNumberOfDays(calculatedNumberOfDays);
    }, [checkInDate, checkOutDate]);

    const calculateTotal = () => {
        const totalPrice = numberOfDays * (room * price);
        setTotal(totalPrice);
    };

    useEffect(() => {
        calculateTotal();
    }, [numberOfDays, room]); // Call calculateTotal whenever room, adults, or children changes

    return (
        <FontLoader>
            <View style={styles.container}>
                <Text style={styles.heading}>Booking Details</Text>
                <View style={styles.dateContainer}>
                    <View style={styles.dateInput}>
                        <Text style={styles.SubHeading}>Check In</Text>
                        <DatePicker selectedDate={checkInDate} onDateChanging={setCheckInDate} />
                    </View>
                    <View style={styles.dateInput}>
                        <Text style={styles.SubHeading}>Check Out</Text>
                        <DatePicker selectedDate={checkOutDate} onDateChanging={setCheckOutDate} />
                    </View>
                </View>
                <View style={styles.optionsContainer}>
                    <View style={styles.option}>
                        <Text style={styles.SubHeading}>Rooms</Text>
                        <CounterButton subtract={decrementRoom} add={incrementRoom} count={room} />
                    </View>
                    <View style={styles.option}>
                        <Text style={styles.SubHeading}>Adults</Text>
                        <CounterButton
                            subtract={decrementAdults}
                            add={incrementAdults}
                            count={adults}
                        />
                    </View>
                    <View style={styles.option}>
                        <Text style={styles.SubHeading}>Children</Text>
                        <CounterButton
                            subtract={decrementChildren}
                            add={incrementChildren}
                            count={children}
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
                        <Text style={styles.PriceValue}>${price}</Text>
                    </View>
                    <View style={styles.TotalPriceContainer}>
                        <View style={styles.TotalContainer}>
                            <Text style={styles.heading}>Total</Text>
                            <Text style={styles.daysRent}>for {numberOfDays} days</Text>
                        </View>
                        <Text style={styles.TotalValue}>${total}</Text>
                    </View>
                </View>
                <PrimaryButton text={"Update Booking Details"} marginHorizontal={0} fontSize={16} />
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

export default EditHotelBooking;
