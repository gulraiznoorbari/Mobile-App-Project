import { useState, useEffect } from "react";
import * as Font from "expo-font";

const FontLoader = ({ children }) => {
    const [fontLoaded, setFontLoaded] = useState(false);

    const loadFont = async () => {
        await Font.loadAsync({
            Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
            "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
            "Poppins SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        });
        setFontLoaded(true);
    };

    useEffect(() => {
        loadFont();
    }, []);

    if (!fontLoaded) {
        return null;
    }

    return children;
};

export default FontLoader;
