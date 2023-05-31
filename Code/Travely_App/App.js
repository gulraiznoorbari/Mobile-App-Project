import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import PasswordResetScreen from "./screens/PasswordResetScreen";
import WishListScreen from "./screens/WishListScreen";
import BookingsScreen from "./screens/BookingsScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Login") {
                        iconName = focused
                            ? "ios-information-circle"
                            : "ios-information-circle-outline";
                    } else if (route.name === "Menu") {
                        iconName = "ios-list";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Wishlist" component={WishListScreen} />
            <Tab.Screen name="Bookings" component={BookingsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const App = () => {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#003580" />
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={TabNavigation} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen
                    name="PasswordReset"
                    component={PasswordResetScreen}
                    options={{
                        headerTitle: "Reset Password",
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: "#003580",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        headerBackTitleVisible: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
