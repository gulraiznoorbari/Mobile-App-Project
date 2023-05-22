import { Button, StyleSheet, Text, View } from "react-native";

import { auth } from "../firebase/config";

const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Home</Text>
            <View style={styles.buttonContainer}>
                <Button title="Logout" onPress={() => auth.signOut()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 50,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default Home;
