import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const CounterButton = ({ subtract, add, count }) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => subtract()}>
                <Text style={styles.reduce}>-</Text>
            </Pressable>
            <Text style={styles.text}>{count}</Text>
            <Pressable onPress={() => add()}>
                <Text style={styles.add}>+</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 85,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    reduce: {
        fontSize: 22,
        fontWeight: "bold",
    },
    text: {
        fontSize: 21,
        fontWeight: "bold",
    },
    add: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default CounterButton;
