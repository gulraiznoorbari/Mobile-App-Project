import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "../components/DatePicker";
import PrimaryButton from "../components/Buttons/PrimaryButton";

const EditAttractionBooking = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
    ]);

    return (
        <View style={styles.container}>
            <Text>Booking Details</Text>
            <View style={styles.formContainer}>
                <View style={styles.dateContainer}>
                    <Text>Check In</Text>
                    <DatePicker />
                    <Text>Check Out</Text>
                    <DatePicker />
                </View>
                <View style={styles.optionsContainer}>
                    <Text>Rooms</Text>
                    <Text>Adults</Text>
                    <Text>Children</Text>
                    <Text>Room Type</Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                    <View style={styles.PriceContainer}>
                        <Text style={styles.PriceText}>Price</Text>
                        <Text style={styles.PriceValue}>$0</Text>
                    </View>
                    <View style={styles.TotalContainer}>
                        <Text style={styles.TotalText}>Total</Text>
                        <Text style={styles.TotalValue}>$0</Text>
                    </View>
                </View>
                <PrimaryButton text={"Update Booking Details"} marginHorizontal={0} />
            </View>
        </View>
    );
};

export default EditAttractionBooking;

const styles = StyleSheet.create({});
