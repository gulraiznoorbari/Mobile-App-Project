import axios from "axios";
import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";

import { NEWS_API_KEY } from "@env";
import ArticleCard from "./Cards/ArticleCard";

const Articles = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get(
                `https://newsapi.org/v2/everything?q=travel%20guide&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`,
            );
            const data = response.data.articles;
            setArticles(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <ArticleCard
                articleURL={item.url}
                imageURL={item.urlToImage}
                title={item.title}
                description={item.description}
            />
        );
    };

    return (
        <>
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#003580" />
                </View>
            ) : (
                <View style={styles.container}>
                    <FlatList
                        horizontal
                        contentContainerStyle={{
                            flexGrow: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 20,
                        }}
                        data={articles}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
});

export default Articles;
