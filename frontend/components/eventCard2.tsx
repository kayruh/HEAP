// EventCard.tsx
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions,TouchableOpacity,} from 'react-native'
import { Card, Image, Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FyndColors from './fyndColors'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { useInteractionApi } from '@/api/interaction'
import LoginModal from './loginModal'
import { useBusinessApi } from '@/api/business'

/* —————————————————— TYPES —————————————————— */
export type EventItem = {
  type: 'event'
  uuid: string
  title: string | null
  description?: string | null
  start?: string | null
  end?: string | null
  business_username?: string
  pictures?: string[]
}

export type BusinessItem = {
  type: 'business'
  username: string
  name: string | null
  google_maps_location?: string | null
  street_no?: string | null
  street_name?: string | null
  unit_no?: string | null
  postal?: string | null
  tags?: string[] | null
  description?: string | null
  pictures?: string[]
}

export type GenericItem = EventItem | BusinessItem

interface Props {
  item: GenericItem
  onPress?: () => void
}

/* —————————————————— UI CONSTANTS —————————————————— */
const { width } = Dimensions.get('window')
const CARD_WIDTH = (width - 60) / 2

/* —————————————————— COMPONENT —————————————————— */
const EventCard: React.FC<Props> = ({ item, onPress }) => {
  const isEvent = item.type === 'event'

  /* ---------- date badge for events ---------- */
  const dateString =
    isEvent && item.start
      ? new Date(item.start).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        })
      : null

  /* ---------- simple address line for businesses ---------- */
  const address =
    !isEvent
      ? [
          item.street_no,
          item.street_name,
          item.unit_no ? `#${item.unit_no}` : null,
          item.postal,
        ]
          .filter(Boolean)
          .join(' ')
      : ''

      const router = useRouter();

  // LIKE EVENTS
  const { user } = useUser();
  const { getEventLikeCheck, deleteLikeEvent, insertLikeEvent} = useInteractionApi()
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    const checkLiked = async () => {
      try {
        if (!user?.username || item.type !== 'event') return;
        const liked = await getEventLikeCheck(user.username, item.uuid);
        setIsLiked(liked);
      } catch (err) {
        setIsLiked(false); // 404 → not liked
      }
    };
  
    checkLiked();
  }, [user?.username, item.uuid]);

  const toggleLike = async () => {
    try {
      if (item.type !== 'event') return;
      if (isLiked) {
        await deleteLikeEvent(item.uuid);
      } else {
        await insertLikeEvent(item.uuid);
      }
      setIsLiked(!isLiked);
      // onLikeChange?.(item.uuid, !isLiked); // Notify Browse so both lists update

    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  // EVENT IMAGES 
  const { getEventImages } = useBusinessApi();
  const [eventImage, setEventImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventImage = async () => {
      try {
        if (isEvent && item.uuid) {
          const images = await getEventImages(item.uuid);
          console.log('Fetched Event Images:', images);
          
          if (images && images.length > 0) {
            setEventImage(images[0]); // use first image
          }
        }
      } catch (err) {
        console.error('Error fetching event images:', err);
      }
    };

    fetchEventImage();
  }, [isEvent, item.uuid]);

  // GET BIZ IMAGES
  const {getBusinessImages} = useBusinessApi();
  const [bizImage, setBizImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBizImage = async () => {
      try {
        if (!isEvent && item.username) {  // Only run if it's NOT an event
          const images = await getBusinessImages(item.username);
          console.log('Fetched Business Images:', images);
  
          if (images && images.length > 0) {
            setBizImage(images[0]); // use first image
          }
        }
      } catch (err) {
        console.error('Error fetching business images:', err);
      }
    };
  
    fetchBizImage();
  }, [isEvent, item.username]);


  /* ---------- pick an image (or fallback) for event or biz ---------- */
  const imageUrl =
  isEvent
    ? (eventImage ?? (item as any).pictures?.[0] ?? require('../assets/FYND_default.png'))
    : (bizImage ?? (item as any).pictures?.[0] ?? require('../assets/FYND_default.png'));

  // LIKE BIZ
  const [bizIsLiked, setBizIsLiked] = useState<boolean>(false)
  const { getBusinessLikeCheck, insertLikeBusiness, deleteLikeBusiness} = useInteractionApi()

  useEffect(() => {
    const checkBusinessLiked = async () => {
      try {
        if (!user?.username || item.type !== 'business') return;
  
        console.log('[LikeCheck] Checking business like for user:', user.username, 'business:', item.username);
        
        const liked = await getBusinessLikeCheck(user.username, item.username);
        setBizIsLiked(liked);
      } catch (err: any) {
        setBizIsLiked(false); // default: not liked
      }
    };
  
    checkBusinessLiked();
  }, [user?.username, item.type === 'business' && item.username]);
  

  const toggleBusinessLike = async () => {
    try {
      if (!item || item.type !== 'business') return;
  
      console.log('[Toggle] Biz:', item.username);
  
      if (bizIsLiked) {
        await deleteLikeBusiness(item.username);
      } else {
        await insertLikeBusiness(item.username);
      }
  
      setBizIsLiked(!bizIsLiked);
    } catch (err: any) {
      console.error('Error toggling business like:', err.response?.status, err.response?.data);
    }
  };

  // login modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <Card containerStyle={styles.card}>
        {/* ---------- IMAGE ---------- */}
        <View style={styles.imageContainer}>
        <Image
          source={
            typeof imageUrl === 'string'
              ? { uri: imageUrl }
              : imageUrl // local image (require)
          }
          style={styles.image}
        />
          {isEvent && (
            <Badge
              value={dateString ?? 'ONGOING'}
              containerStyle={styles.badgeContainer}
              badgeStyle={styles.badge}
              textStyle={styles.badgeText}
            />
          )}

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

        </View>

        {/* top-right action icon */}
        <TouchableOpacity
          style={styles.topRightIcon}
          onPress={() => {
            console.log('🔷 Top-right icon pressed with item data:', item); // logs item data

            if (isEvent) {
              console.log('Heart pressed for event:', item.uuid);
              if (!user) {
                setShowLoginModal(true);
              } else {
                toggleLike(); 
              }
            } else {
              console.log('Plus pressed for business:', item.username);
              if (!user) {
                setShowLoginModal(true);
              } else {
                toggleBusinessLike();
              }
            }
          }}
        >
          <Icon
            name={
              isEvent
                ? isLiked
                  ? 'favorite'
                  : 'favorite-border'
                : bizIsLiked
                  ? 'done'
                  : 'add'
            }
            size={22}
            color={FyndColors.Green}
          />
        </TouchableOpacity>

        {/* ---------- INFO ---------- */}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {isEvent
              ? item.title ?? '(untitled event)'
              : item.name ?? '(unnamed)'}
          </Text>

          <View style={styles.subTextRow}>
            <Text style={styles.subText} numberOfLines={1}>
              {isEvent ? `Hosted by ${item.business_username}` : address}
            </Text>

            {/* Show tags inline if business */}
            {!isEvent && item.tags && item.tags.length > 0 && (
              <View style={styles.bottomLeftTags}>
                  {item.tags.slice(0, 3).map(t => (
                    <View key={t} style={styles.tagChip}>
                      <Text style={styles.tagText}>{t}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
  </View>


        <Icon name="chevron-right" size={22} style={styles.chevron} />
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    margin: 10,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: FyndColors.Yellow,
  },
  imageContainer: {
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  badge: { backgroundColor: FyndColors.Green },
  badgeText: { fontSize: 10 },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: FyndColors.Green,
    marginBottom: 4,
    minHeight: 35,
  },
  subText: {
    fontSize: 12,
    color: '#000',
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap', // allows wrapping if tags overflow
    marginBottom: 8,
  },
  tagInlineRow: {
    flexDirection: 'row',
    marginLeft: 6, // small gap between text and tags
  },
  bottomLeftTags: {
    position: 'absolute',
    flexDirection: 'row',
  },
  tagChip: {
    backgroundColor: FyndColors.Purple,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
  },
  tagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
  },
  chevron: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    color: FyndColors.Green,
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

export default EventCard
