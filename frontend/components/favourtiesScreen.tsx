import React from 'react';
import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = (screenWidth - 48) / 2; // 2 cards + 24px total padding

// fetched from user's db
// update image urls
const data = [
  {
    id: '1',
    title: 'All Saved',
    description: 'Description of list',
    image: 'frontend/assets/FYND.png',
  },
  {
    id: '2',
    title: 'Date Spots',
    description: 'Description of list',
    image: 'https://example.com/radishes.jpg',
  },
  {
    id: '3',
    title: 'Lunch Ideas',
    description: 'Description of list',
    image: 'https://example.com/watermelon.jpg',
  },
  {
    id: '4',
    title: 'Places to Thrift',
    description: 'Description of list',
    image: 'https://example.com/mushrooms.jpg',
  },
  {
    id: '5',
    title: 'Funtivities to do with Friends !',
    description: 'Description of list',
    image: 'https://example.com/vegetable-stack.jpg',
  },
  {
    id: '6',
    title: 'Product',
    description: 'Description of list',
    image: 'https://example.com/cherries.jpg',
  },
];

export default function FavouritesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      <Text className="text-2xl font-extrabold mb-4">Favourites ★</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
        renderItem={({ item }) => (
          <View style={{ width: CARD_WIDTH }}>
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: 120, borderRadius: 8 }}
            />
            <Text className="mt-2 text-sm font-semibold">{item.title}</Text>
            <Text className="text-xs text-gray-500">{item.description}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
