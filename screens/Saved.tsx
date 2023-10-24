import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper'; // Removed unused imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { ComponentNavigationProps, NewsData } from '../utils/types';
import CardItem from '../components/CardItem';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@newsData');
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
    alert('Something Went Wrong');
    return;
  }
};

const Saved = (props: ComponentNavigationProps) => {
  const focused = useIsFocused();
  const [savedNews, setSavedNews] = useState<NewsData[]>([]);

  useEffect(() => {
    getData()
      .then((data) => setSavedNews(data))
      .catch((err) => alert('Error Occurred'));
  }, [focused]);

  const deleteHandler = async (title: string) => {
    try {
      // Remove the saved item with the matching title
      const updatedSavedNews = savedNews.filter((item) => item.title !== title);
      setSavedNews(updatedSavedNews);

      // Store the updated saved items back in AsyncStorage
      await AsyncStorage.setItem('@newsData', JSON.stringify(updatedSavedNews));
    } catch (error) {
      console.error('Error deleting saved item:', error);
      // You may want to show an error message here
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={styles.appBarStyle}>
        <Appbar.Content title="Saved" titleStyle={styles.titleStyle} />
      </Appbar.Header>
      <FlatList
        keyExtractor={(item) => item.title}
        style={styles.flatList}
        data={savedNews}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CardItem
            handleDelete={() => deleteHandler(item.title)}
            navigation={props.navigation}
            description={item.description || ''}
            image_url={item.image_url}
            title={item.title}
            content={item.content}
            placeholderImage={'https://pioneer-technical.com/wp-content/uploads/2016/12/news-placeholder.png'} // You can use your own placeholder image
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
  },
  titleStyle: {
    color: 'black', 
  },
  flatList: {
    display: 'flex',
    flex: 1,
    height: 'auto',
  },
});

export default Saved;
