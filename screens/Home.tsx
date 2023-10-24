import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Appbar, Chip, Button, ProgressBar, MD3Colors } from 'react-native-paper';
import { ComponentNavigationProps, NewsData } from '../utils/types';
import CardItem from '../components/CardItem';
import Icon from 'react-native-vector-icons/FontAwesome'; 

import { NEWS_API_KEY, WEATHER_API_KEY } from '../config'; // Import API keys

const categories = ["Technology", "Sports", "Politics", "Health", "Business"];
const placeholderImage = 'https://pioneer-technical.com/wp-content/uploads/2016/12/news-placeholder.png';

type WeatherData = {
  main: {
    temp: number;
  };
};

const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires,AR&units=metric&appid=${WEATHER_API_KEY}`;

const Home = (props: ComponentNavigationProps) => {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetchWeatherData()
      .then((data) => {
        if (data.cod === 200 && data.main && data.main.temp) {
          setWeather(data as WeatherData);
        } else {
          console.error('Invalid weather data:', data);
        }
      })
      .catch((err) => console.error('Error fetching weather data:', err));
  }, []);
  
  const fetchWeatherData = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(weatherApiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleSelect = (val: string) => {
    setSelectedCategories((prev) =>
      prev.includes(val) ? prev.filter((cat) => cat !== val) : [...prev, val]
    );
  };

  const handlePress = async () => {
    const URL = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&country=us&language=en&${
      selectedCategories.length > 0 ? `category=${selectedCategories.join(',')}` : ''
    }${nextPage?.length > 0 ? `&page=${nextPage}` : ""} `;
    try {
      setIsLoading(true)
      const response = await fetch(URL);
      const data = await response.json();
      if (data.results && Array.isArray(data.results)) {
        setNewsData((prev) => [...prev, ...data.results]);
        setNextPage(data.nextPage);
      } else {
        console.error("Invalid data received:", data);
      }
      setIsLoading(false);
    } catch (err) {
      console.error("API Request Error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBarStyle}>
        <Appbar.Content title="Matt News" titleStyle={styles.titleStyle} />
        {weather && (
          <View style={styles.weatherContainer}>
            <Icon name="sun-o" size={30} color="black" style={styles.weatherIcon} />
            <Text style={styles.temperature}>{weather.main.temp}°C</Text>
          </View>
        )}
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
        keyExtractor={(item) => `${item.title}-${item.publishedAt}`}
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
            placeholderImage={placeholderImage}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBarStyle: {
    backgroundColor: '#f9f7f4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleStyle: {
    color: 'black',
    marginLeft: 60, 
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  weatherIcon: {
    width: 30,
    height: 30,
  },
  temperature: {
    color: 'black',
    fontSize: 18,
    marginLeft: 8,
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

export default Home;
