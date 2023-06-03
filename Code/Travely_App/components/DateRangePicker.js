import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import Modal from "react-native-modal";

const DateRangePicker = () => {
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const onDateChange = (date, type) => {
        if (type === "END_DATE") {
            setSelectedEndDate(date);
        } else {
            setSelectedStartDate(date);
            setSelectedEndDate(null);
        }
    };

    const renderDateInfo = () => {
        if (selectedStartDate && selectedEndDate) {
            const formattedStartDate = moment(selectedStartDate).format("DD/MM/YYYY");
            const formattedEndDate = moment(selectedEndDate).format("DD/MM/YYYY");
            return (
                <Text>
                    Selected Dates: {formattedStartDate} - {formattedEndDate}
                </Text>
            );
        } else if (selectedStartDate) {
            const formattedStartDate = moment(selectedStartDate).format("DD/MM/YYYY");
            return <Text>Selected Date: {formattedStartDate}</Text>;
        } else {
            return <Text>Please select a date.</Text>;
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={showDatePicker}>
                <View>
                    <Text>Select Date</Text>
                    <Text>
                        {selectedStartDate ? moment(selectedStartDate).format("DD/MM/YYYY") : ""}
                    </Text>
                    <TextInput
                        value={
                            selectedStartDate ? moment(selectedStartDate).format("DD/MM/YYYY") : ""
                        }
                        editable={false}
                    />
                </View>
            </TouchableOpacity>

            <Modal
                isVisible={isDatePickerVisible}
                style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                }}
            >
                <View>
                    <TouchableOpacity
                        onPress={() => hideDatePicker()}
                        style={{
                            position: "absolute",
                            top: -35,
                            right: 5,
                            padding: 10,
                            alignItems: "center",
                        }}
                    >
                        <MaterialCommunityIcons name="close" size={24} color="#003580" />
                    </TouchableOpacity>

                    <CalendarPicker
                        startFromMonday={true}
                        allowRangeSelection={true}
                        todayTextStyle={{ fontWeight: "bold" }}
                        selectedDayColor="#003580"
                        selectedDayTextColor="#FFFFFF"
                        onDateChange={onDateChange}
                        width={320}
                        height={320}
                    />
                </View>
            </Modal>

            {renderDateInfo()}
        </View>
    );
};

export default DateRangePicker;
