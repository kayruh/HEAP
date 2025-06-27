import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import CarouselCard from '@/components/eventCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CAROUSEL_ITEM_WIDTH = width * 0.85;

const EventCarousel = ({ data }: { data: any[] }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CAROUSEL_ITEM_WIDTH + 20}
      decelerationRate="fast"
      contentContainerStyle={styles.carouselContainer}
    >
      {data.map((item) => (
        <View key={item.id} style={styles.carouselItemWrapper}>
          <CarouselCard item={item} />
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    scrollView: {
      flex: 1,
    },
    // Carousel Styles
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

export default EventCarousel