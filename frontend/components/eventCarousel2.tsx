import React from 'react'
import { ScrollView, Dimensions, StyleSheet, ImageBackground, View, Text } from 'react-native'

const { width } = Dimensions.get('window')
const CAROUSEL_ITEM_WIDTH = width * 0.85

export interface HotEvent {
  id: string
  title: string | null
  business: string
  pictures: string[]
}

interface EventCarouselProps {
  data: HotEvent[]
}

export default function EventCarousel2({ data }: EventCarouselProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CAROUSEL_ITEM_WIDTH + 20}
      decelerationRate="fast"
      contentContainerStyle={styles.container}
    >
      {data.map(item => {
        const imgUri = item.pictures && item.pictures.length > 0 ? item.pictures[0] : null
        return (
          <ImageBackground
            key={item.id}
            source={ imgUri ? { uri: imgUri } : undefined }
            style={styles.item}
            imageStyle={styles.imageBackground}
          >
            <View style={styles.overlay}>
              <Text style={styles.title} numberOfLines={2}>{item.title ?? 'No title'}</Text>
              <Text style={styles.business}>{item.business}</Text>
            </View>
          </ImageBackground>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
  item: {
    width: CAROUSEL_ITEM_WIDTH,
    height: 180,
    marginRight: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    justifyContent: 'flex-end',
  },
  imageBackground: {
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  business: {
    color: '#fff',
    fontSize: 14,
  },
})