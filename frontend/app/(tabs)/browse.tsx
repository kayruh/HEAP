import { View, Text, SafeAreaView, ScrollView, Button, Alert } from 'react-native'
import React from 'react'
import { Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import TopBanner from '@/components/topBanner';
import CarouselCard from '@/components/carouselCard';

const data = [...new Array(6).keys()];
const width = Dimensions.get("window").width;

// const featuredDeals = [
//   {
//     id: 1,
//     title: 'Summer Collection',
//     subtitle: 'Up to 50% OFF',
//     image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
//     color: '#FF6B6B',
//   },
//   {
//     id: 2,
//     title: 'New Arrivals',
//     subtitle: 'Fresh Styles',
//     image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400',
//     color: '#4ECDC4',
//   },
//   {
//     id: 3,
//     title: 'Weekend Special',
//     subtitle: 'Limited Time',
//     image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
//     color: '#45B7D1',
//   },
// ];

// const products = [
//   {
//     id: 1,
//     name: 'Wireless Headphones',
//     price: 99.99,
//     originalPrice: 149.99,
//     rating: 4.5,
//     image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
//     isNew: true,
//   },
//   {
//     id: 2,
//     name: 'Smart Watch',
//     price: 299.99,
//     originalPrice: 399.99,
//     rating: 4.8,
//     image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
//     isNew: false,
//   },
//   {
//     id: 3,
//     name: 'Phone Case',
//     price: 29.99,
//     originalPrice: 39.99,
//     rating: 4.2,
//     image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=300',
//     isNew: true,
//   },
//   {
//     id: 4,
//     name: 'Laptop Stand',
//     price: 49.99,
//     originalPrice: 69.99,
//     rating: 4.6,
//     image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300',
//     isNew: false,
//   },
// ];


const browse = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };
  return (
    <SafeAreaView>
      
      <TopBanner/>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

      <Text className='text-2xl font-bold pl-3 pt-3'>What's Happening</Text>

      <Text className='text-sm pl-3'>Description of this tab</Text>

      <Text className='text-lg font-bold pl-3'>
        {'\n'}
        What's Hot
      </Text>

      <View className='mt-3'>
        <Carousel
          ref={ref}
          width={width}
          height={width / 2}
          data={data}
          onProgressChange={progress}
          renderItem={({ index }) => (
            <View className="flex-1 border justify-center"
            >
              <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
            </View>
          )}
        />
  
        <Pagination.Basic
          progress={progress}
          data={data}
          dotStyle={{ 
            width:5 ,
            height:5,
            backgroundColor: "rgba(0,0,0,0.2)", 
            borderRadius: 3 }}
          containerStyle={{ gap: 5, marginTop: 10 }}
          onPress={onPressPagination}
        />
      </View>

      <View className="mt-2">
        <Text>
        </Text>
        <Button
          title="Discover more"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
      </View>

        <Text className='pl-3'>Insert event cards here</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

export default browse

// to do, add a horizontal carousel that fits maybe 1/3 the screen to show whats popular
//below that add a vertical scrollable to show all events that are happening. 
// ^ create event card component to render how each event card will look like (take from DB)
//add a filter button
