// Browse.tsx  ────────────────────────────────────────────────────────────────
import React, { useEffect, useState, useMemo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native'
import { Ionicons }    from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

import { useAppApi }         from '@/api/app'
import { useInteractionApi } from '@/api/interaction'

import EventCarousel2, { HotEvent } from '@/components/eventCarousel2'
import EventCard                    from '@/components/eventCard2'
import FyndBanner                   from '@/components/fyndBanner'
import FyndColors                   from '@/components/fyndColors'

/* -------------------------------------------------------------------------- */
/* types                                                                      */
export interface GenericItem {
  type: 'event' | 'business'
  uuid?: string             // events
  username?: string         // businesses
  title?: string | null     // events
  name?:  string | null     // businesses
  pictures?: string[]       // optional
  google_maps_location?: string | null
}

/* -------------------------------------------------------------------------- */
export default function Browse() {
  const { getWhatsHot, getEventsBusiness } = useAppApi()
  const {
    insertLikeBusiness,
    deleteLikeBusiness,
    insertLikeEvent,
    deleteLikeEvent,
  } = useInteractionApi()

  /* ---------------- state ---------------- */
  const [hotEvents, setHotEvents]   = useState<HotEvent[]>([])
  const [allItems,  setAllItems]    = useState<GenericItem[]>([])
  const [loading,   setLoading]     = useState(true)

  /* in-memory like flags (optimistic UI only) */
  const [eventLiked, setEventLiked] = useState<Record<string, boolean>>({})
  const [bizLiked,   setBizLiked]   = useState<Record<string, boolean>>({})

  /* ---------------- fetch “What’s Hot” ---------------- */
  useEffect(() => {
    ;(async () => {
      try {
        const data = await getWhatsHot()
        setHotEvents(
          data.map((e: any) => ({
            id:        e.uuid,
            title:     e.title,
            business:  e.business_username,
            pictures:  e.pictures ?? [],
          })),
        )
      } catch (err) {
        console.error('Failed to load hot events:', err)
      }
    })()
  }, [])

  /* ---------------- fetch everything else ---------------- */
  useEffect(() => {
    ;(async () => {
      try {
        const data = await getEventsBusiness()
        setAllItems(data)
      } catch (err) {
        console.error('Failed to load events / businesses:', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  /* ---------------- card renderer ---------------- */
  const renderItem: ListRenderItem<GenericItem> = ({ item }) => {
    const isEvent = item.type === 'event'
    const liked   = isEvent
      ? eventLiked[item.uuid ?? ''] ?? false
      : bizLiked[item.username ?? ''] ?? false

    /* like / unlike handler */
    const toggleLike = async () => {
      try {
        if (isEvent) {
          liked
            ? await deleteLikeEvent(item.uuid!)
            : await insertLikeEvent(item.uuid!)
          setEventLiked(prev => ({ ...prev, [item.uuid!]: !liked }))
        } else {
          liked
            ? await deleteLikeBusiness(item.username!)
            : await insertLikeBusiness(item.username!)
          setBizLiked(prev => ({ ...prev, [item.username!]: !liked }))
        }
      } catch (e) {
        console.error('Toggle like failed:', e)
      }
    }

    return (
      <View style={styles.cardWrap}>
        {/* floating ♥ / + */}
        <TouchableOpacity
          onPress={toggleLike}
          activeOpacity={0.7}
          style={[
            styles.fab,
            isEvent
              ? { top: 8,  right: 8 }   // events → ♥ top-right
              : { bottom: 8, right: 8 } // businesses → + bottom-right
          ]}
        >
          {isEvent ? (
            <FontAwesome
              name={liked ? 'heart' : 'heart-o'}
              size={22}
              color={FyndColors.Green}
            />
          ) : (
            <Ionicons
              name={liked ? 'checkmark' : 'add'}
              size={24}
              color={FyndColors.Green}
            />
          )}
        </TouchableOpacity>

        {/* original visual card */}
        <EventCard
          item={item}
          onPress={() => console.log('🟡 pressed:', item)}
        />
      </View>
    )
  }

  /* ---------------- key + header ---------------- */
  const keyExtractor = (i: GenericItem) =>
    i.type === 'event' ? `ev-${i.uuid}` : `biz-${i.username}`

  const header = useMemo(() => (
    <>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.section}>What's Hot</Text>
      {hotEvents.length
        ? <EventCarousel2 data={hotEvents} />
        : <Text style={styles.loading}>Loading hot items…</Text>}
      <Text style={styles.section}>All Places & Events</Text>
    </>
  ), [hotEvents])

  /* ---------------- render ---------------- */
  return (
    <View style={styles.container}>
      <FyndBanner
        backgroundColor={FyndColors.Yellow}
        textColor={FyndColors.Green}
        iconColor={FyndColors.Green}
      />

      {loading ? (
        <Text style={styles.loading}>Loading list…</Text>
      ) : (
        <FlatList
          data={allItems}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.rowWrap}
          ListHeaderComponent={header}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  )
}

/* -------------------------------------------------------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  section:   { fontSize: 20, fontWeight: '700', color: '#333', margin: 20 },
  loading:   { textAlign: 'center', marginVertical: 20, color: '#666' },

  rowWrap:   { justifyContent: 'space-between', paddingHorizontal: 10 },

  /* ---- only stuff below this line is new / changed ---- */
  cardWrap: { position: 'relative' },          // anchor for absolute fab

  fab: {
    position:  'absolute',
    zIndex:    5,
    width:     36,
    height:    36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

    /* subtle elevation / iOS shadow */
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
})
