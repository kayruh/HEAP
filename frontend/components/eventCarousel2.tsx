import React from 'react'
import { ScrollView, Dimensions, StyleSheet, ImageBackground, View, Text } from 'react-native'
import FyndColors from '@/components/fyndColors'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

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
          
          <TouchableOpacity
            style={styles.topRightIcon}
            onPress={() => {
              console.log('🔷 Top-right icon pressed with item data:', item) 
              // logs item data when heart or plus pressed
            }}
          >
          <Icon
            name='favorite-border'
            size={22}
            color={FyndColors.Green}
          />
        </TouchableOpacity>

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
    backgroundColor: FyndColors.Yellow,
    padding: 10,
  },
  title: {
    color: FyndColors.Green,
    fontSize: 16,
    fontWeight: 'bold',
  },
  business: {
    color: '#000',
    fontSize: 14,
  },
  topRightIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  },
})