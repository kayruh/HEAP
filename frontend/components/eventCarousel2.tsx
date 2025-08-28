import React, { useEffect, useState } from 'react'
import { ScrollView, Dimensions, StyleSheet, ImageBackground, View, Text } from 'react-native'
import FyndColors from '@/components/fyndColors'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LoginModal from './loginModal'
import { useUser } from '@clerk/clerk-expo'
import { useInteractionApi } from '@/api/interaction'
import { useRouter } from 'expo-router'
import { useBusinessApi } from '@/api/business'

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
  const router = useRouter();

  // EVENT IMAGES
  const { getEventImages } = useBusinessApi(); 

  const [eventImages, setEventImages] = useState<{ [id: string]: string | null }>({});

  // Fetch event images for all events in data
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesMap: { [id: string]: string | null } = {};
        for (const ev of data) {
          const images = await getEventImages(ev.id);
          if (images && images.length > 0) {
            imagesMap[ev.id] = images[0]; // use first image
          } else {
            imagesMap[ev.id] = null;
          }
        }
        setEventImages(imagesMap);
      } catch (err) {
        console.error('Error fetching event images:', err);
      }
    };

    fetchImages();
  }, [data]);

  // login modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  // LIKE EVENTS
  const { user } = useUser();
  const { getEventLikeCheck, deleteLikeEvent, insertLikeEvent} = useInteractionApi()
  const [isLiked, setIsLiked] = useState<{ [id: string]: boolean }>({});

  // FIX THIS TO TOGGLE LIKE BUTTON
  useEffect(() => {
    if (!user?.username) return;

    const checkLiked = async () => {
      try {
        const likes: { [id: string]: boolean } = {};
        for (const ev of data) {
          const liked = await getEventLikeCheck(user.username, ev.id);
          likes[ev.id] = liked;
        }
        setIsLiked(likes);
      } catch (err) {
        console.error("Error fetching likes:", err);
      }
    };
  
    checkLiked();
  }, [user?.username, data]);

  const toggleLike = async (id: string) => {
    try {
      const current = isLiked[id] ?? false;
      if (current) {
        await deleteLikeEvent(id);
      } else {
        await insertLikeEvent(id);
      }
      setIsLiked(prev => ({ ...prev, [id]: !current }));
  
      // 🔄 also update Browse list instantly
      // onLikeChange?.(id, !current);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };


  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CAROUSEL_ITEM_WIDTH + 20}
      decelerationRate="fast"
      contentContainerStyle={styles.container}
    >
      {data.map(item => {
        const imgUri = eventImages[item.id]
        ? eventImages[item.id]
        : item.pictures && item.pictures.length > 0
        ? item.pictures[0]
        : require('../assets/FYND_default.png'); // use require for fallback
      
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            onPress={() => router.push(`../events/${item.id}`)}
          >
          <ImageBackground
            source={typeof imgUri === 'string' ? { uri: imgUri } : imgUri} // handle string vs require
            style={styles.item}
            imageStyle={styles.imageBackground}
          >
          {/* Like button */}
          <TouchableOpacity
            style={styles.topRightIcon}
            onPress={() => {
              if (!user) {
                setShowLoginModal(true);
              } else {
                toggleLike(item.id);
              }
            }}
          >
            <Icon
              name={isLiked[item.id] ? 'favorite' : 'favorite-border'}
              size={22}
              color={FyndColors.Green}
            />
          </TouchableOpacity>

        <View style={styles.overlay}>
          <Text style={styles.title} numberOfLines={2}>{item.title ?? 'No title'}</Text>
          <Text style={styles.business}>Hosted by {item.business}</Text>
        </View>

      </ImageBackground>
    </TouchableOpacity>
  )
})}

      <LoginModal
          visible={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSignIn={() => {
            setShowLoginModal(false); 
            setTimeout(() => router.push('../(auth)/sign-in')); // delay navigation slightly
          }}
          onSignUp={() => {
            setShowLoginModal(false); 
            setTimeout(() => router.push('../(auth)/sign-up'));
          }}
          onBizSignUp={
            () => {
              setShowLoginModal(false); 
              setTimeout(() => router.push('../(auth)/business-sign-up'));
          }}
        />

    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
  item: {
    width: CAROUSEL_ITEM_WIDTH,
    height: 200,
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
    marginBottom: 5,
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