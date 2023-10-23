import { Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { Card, Text, useTheme } from 'react-native-paper';

type Props = {
    title: string;
    image_url: string;
    content: string;
}

const DetailsCard = (props: Props) => {
    const theme = useTheme();

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{ color: "black", marginVertical: 10, textAlign: 'center' }} variant="headlineMedium">
                {props.title}
            </Text>
            <Card style={{ backgroundColor: theme.colors.background }} contentStyle={{ width: Dimensions.get("window").width }}>
                {props.image_url && (
                    <Card.Cover source={{ uri: props.image_url }} />
                )}

                <Card.Content>
                    <Text
                        textBreakStrategy="highQuality"
                        variant="headlineSmall"
                        style={{ marginLeft: 10, marginVertical: 10, textAlign: 'justify' }}>
                        {props.content}
                    </Text>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

export default DetailsCard;
