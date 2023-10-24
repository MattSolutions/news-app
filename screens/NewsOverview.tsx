import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ComponentNavigationProps, NewsData } from '../utils/types';
import DetailsCard from '../components/DetailsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the icon

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@newsData');
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    alert('Something Went Wrong');
    return;
  }
};

const storeData = async (value: Pick<NewsData, 'title' | 'content' | 'image_url'>) => {
  const data: NewsData[] = (await getData()) || [];

  const existingItemIndex = data.findIndex((d) => d.title === value.title);
  if (existingItemIndex !== -1) {
    data.splice(existingItemIndex, 1);
  } else {
    data.push(value as NewsData);
  }

  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('@newsData', jsonValue);
  } catch (e) {
    alert('Something Went Wrong with storing data');
  }
};

const NewsOverview = (props: ComponentNavigationProps) => {
  const route = useRoute();
  const { title, content, image_url } = route.params as NewsData;
  const [isSaved, setSaved] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Icon
          name={isSaved ? 'heart' : 'heart-outline'}
          size={30}
          color="red" // Set the color to red
          onPress={() => {
            storeData({ title, content, image_url });
            setSaved(!isSaved);
          }}
          style={isSaved ? styles.redIcon : styles.blackIcon}
        />
      ),
    });
  }, [isSaved]);

  return <DetailsCard content={content} image_url={image_url} title={title} />;
};

const styles = StyleSheet.create({
  redIcon: {
    marginRight: 10,
    marginTop: 0,
  },
  blackIcon: {
    marginRight: 10,
    marginTop: 0,
  },
});

export default NewsOverview;
