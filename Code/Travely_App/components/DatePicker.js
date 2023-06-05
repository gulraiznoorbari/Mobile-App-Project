import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import Modal from "react-native-modal";
import FontLoader from "./FontLoader";

const DatePicker = () => {
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const onDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const renderDateInfo = () => {
        if (selectedStartDate) {
            const formattedStartDate = moment(selectedStartDate).format("DD/MM/YYYY");
            return formattedStartDate;
        } else {
            return "";
        }
    };

    return (
        <FontLoader>
            <TouchableOpacity onPress={showDatePicker}>
                <View style={{ width: "45%" }}>
                    <MaterialCommunityIcons
                        name="calendar-range"
                        size={24}
                        color="#000"
                        style={{
                            position: "absolute",
                            top: 15,
                            left: 15,
                            zIndex: 1,
                        }}
                    />
                    <TextInput
                        value={renderDateInfo()}
                        editable={false}
                        placeholder="Select date"
                        style={{
                            backgroundColor: "#fff",
                            padding: 6,
                            paddingLeft: 50,
                            marginTop: 6,
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
                        onPress={() => {
                            hideDatePicker();
                            // setSelectedStartDate(null);
                        }}
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
                        todayTextStyle={{ fontWeight: "bold" }}
                        selectedDayColor="#003580"
                        selectedDayTextColor="#FFFFFF"
                        onDateChange={onDateChange}
                        width={325}
                        height={325}
                    />
                </View>
            </Modal>
        </FontLoader>
    );
};

export default DatePicker;
