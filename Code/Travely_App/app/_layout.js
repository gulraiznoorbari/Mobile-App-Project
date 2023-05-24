import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Layout = () => {
    return (
        <>
            <StatusBar style="auto" animated={true} />
            <Stack initialRouteName="index" screenOptions={{ headerShown: false }} />
        </>
    );
};

export default Layout;
