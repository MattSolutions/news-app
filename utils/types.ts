import { NavigationProp } from '@react-navigation/native';




export type NewsData = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    publishedAt: any;
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
    placeholder: string;
};

export type ComponentNavigationProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation: NavigationProp<any, 'News Overview'>; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    route: NavigationProp<any, 'News Overview'>;
};
