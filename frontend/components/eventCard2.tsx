// EventCard.tsx
import React from 'react'
import { View, Text, StyleSheet, Dimensions,TouchableOpacity,} from 'react-native'
import { Card, Image, Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FyndColors from './fyndColors'
import { useRouter } from 'expo-router'

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

  /* ---------- pick an image (or fallback) ---------- */
  const imageUrl =
    (item as any).pictures?.[0] ??
    'https://placehold.co/400x250?text=No+Image'

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
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <Card containerStyle={styles.card}>
        {/* ---------- IMAGE ---------- */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          {isEvent && (
            <Badge
              value={dateString ?? 'ONGOING'}
              containerStyle={styles.badgeContainer}
              badgeStyle={styles.badge}
              textStyle={styles.badgeText}
            />
          )}
        </View>

        {/* top-right action icon */}
        <TouchableOpacity
          style={styles.topRightIcon}
          onPress={() => {
            console.log('🔷 Top-right icon pressed with item data:', item) // logs item data when heart or plus pressed
            if (isEvent) {
              console.log('Heart pressed for event:', item.uuid)
              router.push(`/(tabs)/events/${item.title}`)
            } else {
              console.log('Plus pressed for business:', item.username)
              router.push(`/(tabs)/events/${item.title}`)
            }
          }}
        >
          <Icon
            name={isEvent ? 'favorite-border' : 'add'}
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

          {isEvent ? (
            <Text style={styles.subText} numberOfLines={1}>
              Hosted by {item.business_username}
            </Text>
          ) : (
            <Text style={styles.subText} numberOfLines={2}>
              {address}
            </Text>
          )}

          {/* ---------- TAG CHIPS FOR BUSINESSES ---------- */}
          {!isEvent && item.tags && item.tags.length > 0 && (
            <View style={styles.tagRow}>
              {item.tags.slice(0, 3).map(t => (
                <View key={t} style={styles.tagChip}>
                  <Text style={styles.tagText}>{t}</Text>
                </View>
              ))}
            </View>
          )}
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
  tagChip: {
    backgroundColor: FyndColors.Green,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginTop: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#fff',
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
