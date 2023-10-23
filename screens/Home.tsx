import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Appbar, Chip, Button, ProgressBar, MD3Colors } from 'react-native-paper';
import { ComponentNavigationProps, NewsData } from '../utils/types';
import CardItem from '../components/CardItem';

const categories = ["Technology", "Sports", "Politics", "Health", "Business"];
const API_KEY = 'pub_3167452f28bb15d090613df9543aae83081fa';

const Home = (props: ComponentNavigationProps) => {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState("");

  const handleSelect = (val: string) => {
    setSelectedCategories((prev) =>
      prev.includes(val) ? prev.filter((cat) => cat !== val) : [...prev, val]
    );
  };

  const handlePress = async () => {
    const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=us&language=en&${
      selectedCategories.length > 0 ? `category=${selectedCategories.join(',')}` : ''
    }${nextPage?.length > 0 ? `&page=${nextPage}` : ""} `;
    try {
      setIsLoading(true)
      const response = await fetch(URL);
      const data = await response.json();
      if (data.results && Array.isArray(data.results)) {
        // Ensure that data.results is an array
        setNewsData((prev) => [...prev, ...data.results]);
        setNextPage(data.nextPage);
      } else {
        // Handle the case where data.results is not an array
        console.error("Invalid data received:", data);
      }
      setIsLoading(false);
    } catch (err) {
      console.error("API Request Error:", err);
    }
  };
  
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="News Feed" />
      </Appbar.Header>
      <View style={styles.filtersContainer}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            mode="outlined"
            style={styles.chipItem}
            textStyle={{ fontWeight: "400", color: "white", padding: 1 }}
            selected={selectedCategories.includes(cat)}
            onPress={() => handleSelect(cat)}
          >
            {cat}
          </Chip>
        ))}
        <Button
          style={styles.button}
          labelStyle={{ fontSize: 14, margin: "auto", color: "black" }}
          icon="sync"
          onPress={handlePress}
        >
          Refresh
        </Button>
      </View>
      <ProgressBar visible={isLoading} indeterminate color={MD3Colors.error50} />
      <FlatList
        keyExtractor={(item) => item.title}
        onEndReached={() => handlePress()}
        style={styles.flatList}
        data={newsData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CardItem
            navigation={props.navigation}
            description={item.description || ""}
            image_url={item.image_url}
            title={item.title}
            content={item.content}
          />
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  button: {
    maxWidth: 400,
    padding: 0,
    maxHeight: 40,
  },
  flatList: {
    flex: 1,
    height: "auto",
  },
});
