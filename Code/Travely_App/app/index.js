import { useState } from "react";
import { SafeAreaView, View } from "react-native";

import Home from "../screens/Home";
import Login from "../screens/Login";

export default function Page() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    return (
        <SafeAreaView>
            {userLoggedIn ? <Home /> : <Login setUserLoggedIn={setUserLoggedIn} />}
        </SafeAreaView>
    );
}
