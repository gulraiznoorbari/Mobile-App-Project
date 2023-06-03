import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import Modal from "react-native-modal";
import FontLoader from "./FontLoader";

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
            return `${formattedStartDate} - ${formattedEndDate}`;
        } else if (selectedStartDate) {
            const formattedStartDate = moment(selectedStartDate).format("DD/MM/YYYY");
            return `${formattedStartDate}`;
        } else {
            return "";
        }
    };

    return (
        <FontLoader>
            <TouchableOpacity onPress={showDatePicker}>
                <View>
                    <MaterialCommunityIcons
                        name="calendar-range"
                        size={24}
                        color="#000"
                        style={{
                            position: "absolute",
                            top: 15,
                            left: 35,
                            zIndex: 1,
                        }}
                    />
                    <TextInput
                        value={renderDateInfo()}
                        editable={false}
                        placeholder="Select dates"
                        style={{
                            backgroundColor: "#fff",
                            padding: 7,
                            paddingLeft: 50,
                            marginHorizontal: 20,
                            marginTop: 5,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: "#000",
                            fontFamily: "Poppins",
                            fontSize: 15,
                        }}
                    />
                </View>
            </TouchableOpacity>

            <Modal
                isVisible={isDatePickerVisible}
                style={{
                    backgroundColor: "white",
                    marginVertical: 190,
                    borderRadius: 10,
                }}
            >
                <View>
                    <TouchableOpacity
                        onPress={() => hideDatePicker()}
                        style={{
                            position: "absolute",
                            top: -40,
                            right: 0,
                            padding: 10,
                            alignItems: "center",
                        }}
                    >
                        <MaterialCommunityIcons name="close" size={26} color="#003580" />
                    </TouchableOpacity>

                    <CalendarPicker
                        startFromMonday={true}
                        allowRangeSelection={true}
                        todayTextStyle={{ fontWeight: "bold" }}
                        selectedDayColor="#003580"
                        selectedDayTextColor="#FFFFFF"
                        onDateChange={onDateChange}
                        width={325}
                        height={325}
                    />
                </View>
            </Modal>

            {/* {renderDateInfo()} */}
        </FontLoader>
    );
};

export default DateRangePicker;
