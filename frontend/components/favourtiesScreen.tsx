import React from 'react';
import { View, Text, Image, FlatList, Dimensions,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = (screenWidth - 48) / 2; // 2 cards + 24px total padding

// fetched from user's db -> MAKE IT DYNAMIC
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
    <View style={styles.container}>
      <Text style={styles.header}>Favourites ★</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={[styles.card, { width: CARD_WIDTH }]}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16, // px-4
    paddingTop: 10,        // pt-4
    paddingLeft: 7,
  },
  header: {
    fontSize: 24,          // text-2xl
    fontWeight: 'bold',    // font-bold
    marginBottom: 16,      // mb-4
  },
  card: {
    flex: 1,
    margin: 8, // small gap between cards
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    minWidth: '48%', // ensures 2 columns fit
    maxWidth: '48%',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  title: {
    marginTop: 8,          // mt-2
    fontSize: 14,          // text-sm
    fontWeight: '600',     // font-semibold
  },
  description: {
    fontSize: 12,          // text-xs
    color: '#6b7280',      // Tailwind's gray-500
  },
});