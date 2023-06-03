import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FontLoader from "./components/FontLoader";
import CustomHomeHeader from "./components/CustomHomeHeader";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import PasswordResetScreen from "./screens/PasswordResetScreen";
import WishlistScreen from "./screens/WishlistScreen";
import BookingsScreen from "./screens/BookingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DestinationDetailScreen from "./screens/DestinationDetailScreen";
import DetailScreen from "./screens/DetailScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <FontLoader>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "HomeScreen") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "Wishlist") {
                            iconName = focused ? "heart" : "heart-outline";
                        } else if (route.name === "Bookings") {
                            iconName = focused ? "calendar-check" : "calendar-check-outline";
                        } else if (route.name === "Profile") {
                            iconName = focused ? "account-circle" : "account-circle-outline";
                        }
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                    headerShown: false,
                    tabBarItemStyle: {
                        paddingVertical: 5,
                    },
                    tabBarLabelStyle: {
                        fontFamily: "Poppins SemiBold",
                    },
                    tabBarStyle: {
                        height: 54,
                        backgroundColor: "#fff",
                    },
                    tabBarActiveBackgroundColor: "#b5b5b5",
                    tabBarActiveTintColor: "#000",
                    tabBarInactiveTintColor: "#000",
                    tabBarHideOnKeyboard: true,
                    tabBarVisibilityAnimationConfig: {
                        show: {
                            animation: "timing",
                            config: {
                                duration: 300,
                            },
                        },
                        hide: {
                            animation: "spring",
                            config: {
                                duration: 100,
                            },
                        },
                    },
                })}
            >
                <Tab.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        headerShown: true,
                        header: () => <CustomHomeHeader />,
                    }}
                />
                <Tab.Screen
                    name="Wishlist"
                    component={WishlistScreen}
                    options={{ tabBarLabel: "Wishlist" }}
                />
                <Tab.Screen
                    name="Bookings"
                    component={BookingsScreen}
                    options={{ tabBarLabel: "Bookings" }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ tabBarLabel: "Profile" }}
                />
            </Tab.Navigator>
        </FontLoader>
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
                <Stack.Screen name="DestinationDetail" component={DestinationDetailScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
