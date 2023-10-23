import { RouteProp, NavigationProp, Route} from '@react-navigation/native';




export type NewsData = {
    title: string;
    link: string;
    keywords: string[];
    creator: string;
    video_url: string;
    description: string;
    content: string;
    pubDate: string;
    image_url: string;
    source_id: string;
    category: string[];
    country: string;
    language: string;
};

export type ComponentNavigationProps = {
    navigation: NavigationProp<any, 'News Overview'>; // Use the route name here
    route: NavigationProp<any, 'News Overview'>;
};
