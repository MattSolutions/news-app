import { Pressable } from 'react-native';
import React from 'react';
import { Card, useTheme, IconButton } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  title: string;
  image_url: string;
  description: string;
  content: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationProp<any, 'News Overview'>;
  handleDelete?: (val: string) => void;
  placeholderImage: string; 
};

const CardItem = (props: Props) => {
  const theme = useTheme();

  const handlePress = () => {
    props.navigation.navigate("News Overview", {
      title: props.title,
      description: props.description,
      image_url: props.image_url,
      content: props.content,
    });
  }

  return (
    <Pressable onPress={handlePress}>
      <Card style={{ marginVertical: 10, backgroundColor: theme.colors.elevation.level5 }}>
        <Card.Cover
          borderRadius={10}
          source={{ uri: props.image_url || props.placeholderImage }} 
          onError={(error) => console.log('Image Error:', error.nativeEvent.error)}
        />

        <Card.Title
          title={props.title}
          subtitle={props.description.split("\n")[0]}
          titleNumberOfLines={1}
        />
        {props.handleDelete && (
          <Card.Actions>
            <IconButton
              icon="trash-can"
              onPress={() => props.handleDelete && props.handleDelete(props.title)}
            />
          </Card.Actions>
        )}
      </Card>
    </Pressable>
  );
};

export default CardItem;