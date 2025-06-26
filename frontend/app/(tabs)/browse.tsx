import { View, Text, SafeAreaView, ScrollView, Button, Alert } from 'react-native'
import React from 'react'
import { Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const data = [...new Array(6).keys()];
const width = Dimensions.get("window").width;

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
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <Text className='text-2xl font-bold pl-3'>What's Happening</Text>

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

      <View className="mt-6 px-3">
        <Text>
        </Text>
        <Button
          title="Discover more"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
      </View>

        <Text>Insert event cards here</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

export default browse

// to do, add a horizontal carousel that fits maybe 1/3 the screen to show whats popular
//below that add a vertical scrollable to show all events that are happening. 
// ^ create event card component to render how each event card will look like (take from DB)
//add a filter button
