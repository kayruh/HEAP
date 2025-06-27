import { View, Text, Image, StyleSheet, Dimensions} from 'react-native'
import React from 'react'
import { Card, Button, Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CAROUSEL_ITEM_WIDTH = width * 0.85;

// Carousel Card Component
const CarouselCard = ({ item }: { item: any }) => {
  return(
  <Card containerStyle={[styles.carouselCard, { backgroundColor: item.color }]}>
    <View style={styles.carouselContent}>
      <Text style={styles.carouselTitle}>{item.title}</Text>
      <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
      <Button
        title="Shop Now"
        buttonStyle={styles.carouselButton}
        titleStyle={styles.carouselButtonText}
        onPress={() => console.log('Carousel item pressed:', item.title)}
      />
    </View>
    <Image
      source={{ uri: item.image }}
      style={styles.carouselImage}
      resizeMode="cover"
    />
  </Card>
  )
};

// Carousel Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  
carouselContainer: {
  paddingLeft: 20,
},
carouselItemWrapper: {
  marginRight: 20,
},
carouselCard: {
  width: CAROUSEL_ITEM_WIDTH,
  height: 180,
  borderRadius: 16,
  margin: 0,
  padding: 0,
  overflow: 'hidden',
  flexDirection: 'row',
},
carouselContent: {
  flex: 1,
  padding: 20,
  justifyContent: 'center',
},
carouselTitle: {
  fontSize: 22,
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 8,
},
carouselSubtitle: {
  fontSize: 16,
  color: 'white',
  opacity: 0.9,
  marginBottom: 20,
},
carouselButton: {
  backgroundColor: 'rgba(255,255,255,0.2)',
  borderRadius: 20,
  paddingHorizontal: 20,
},
carouselButtonText: {
  color: 'white',
  fontWeight: '600',
  fontSize: 14,
},
carouselImage: {
  width: 100,
  height: '100%',
  opacity: 0.3,
},
});

export default CarouselCard

