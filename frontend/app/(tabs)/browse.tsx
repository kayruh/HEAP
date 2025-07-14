// Browse.tsx  ────────────────────────────────────────────────────────────────
import React, { useEffect, useState, useMemo } from 'react'
import { View, Text, StyleSheet, StatusBar, FlatList, ListRenderItem,} from 'react-native'
import { useAppApi } from '@/api/app'
import EventCarousel2, { HotEvent } from '@/components/eventCarousel2'
import EventCard from '@/components/eventCard2'
import FyndBanner from '@/components/fyndBanner'

export interface GenericItem {
  type: 'event' | 'business'
  uuid?: string          // events
  username?: string      // businesses & events
  title?: string | null  // events
  name?: string | null   // businesses
  pictures?: string[]    // events (optional)
  google_maps_location?: string | null // businesses
  // … add any other fields you need later
}

import { Dimensions } from "react-native";
import FyndColors from '@/components/fyndColors'


const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CAROUSEL_ITEM_WIDTH = width * 0.85;


export default function Browse() {
  const { getWhatsHot, getEventsBusiness } = useAppApi()

  /* -------------------- state -------------------- */
  const [hotEvents, setHotEvents]       = useState<HotEvent[]>([])
  const [allItems,  setAllItems]        = useState<GenericItem[]>([])
  const [loadingAll, setLoadingAll]     = useState<boolean>(true)

  /* -------------------- fetch “What’s Hot” -------------------- */
  useEffect(() => {
    ;(async () => {
      try {
        const data = await getWhatsHot()
        const mapped: HotEvent[] = data.map((e: any) => ({
          id:        e.uuid,
          title:     e.title,
          business:  e.business_username,
          pictures:  e.pictures ?? [],
        }))
        setHotEvents(mapped)
      } catch (err) {
        console.error('Failed to load hot events:', err)
      }
    })()
  }, [])

  /* -------------------- fetch full list -------------------- */
  useEffect(() => {
    ;(async () => {
      try {
        const data = await getEventsBusiness()
        setAllItems(data)            // already mixed events + businesses
      } catch (err) {
        console.error('Failed to load events / businesses:', err)
      } finally {
        setLoadingAll(false)
      }
    })()
  }, [])

  /* -------------------- mapping for EventCard -------------------- */
  const renderItem: ListRenderItem<GenericItem> = ({ item }) => {
    // transform the supabase object into the props EventCard expects
    // const cardProps = {
    //   image:            // pick the first available image-ish URL
    //     item.pictures?.[0] ??
    //     item.google_maps_location ??                    // placeholder if you have one
    //     'https://placehold.co/300x200?text=No+Image',
    //   name:   item.type === 'event'
    //           ? item.title  ?? '(untitled event)'
    //           : item.name   ?? '(unnamed business)',
    //   rating: 0,
    //   price:  '',
    //   originalPrice: '',
    //   isNew:  item.type === 'event',   // flag events as “NEW”
    // }

    // return <EventCard item={cardProps} />

    // returns everything in item
    return (
      <EventCard
        item={item}
        onPress={() => {
          console.log('🟡 You pressed on:', item)
        }}/>
    )
  }
  

  /* -------------------- key extractor -------------------- */
  const keyExtractor = (item: GenericItem) =>
    item.type === 'event' ? `ev-${item.uuid}` : `biz-${item.username}`

  /* -------------------- memoised header (carousel) -------------------- */
  const listHeader = useMemo(
    () => (
      <>
      <View>
          <StatusBar barStyle="dark-content" />
          <Text style={styles.sectionTitle}>What's Hot</Text>
          {hotEvents.length ? (
            <EventCarousel2 data={hotEvents} />
          ) : (
            <Text style={styles.loadingText}>Loading hot items…</Text>
          )}
          <Text style={styles.sectionTitle}>All Places & Events</Text>
        </View>
      </>
    ),
    [hotEvents]
  )

  /* -------------------- render -------------------- */
  return (
    <View style={styles.container}>
      <FyndBanner
            backgroundColor = {FyndColors.Yellow} 
            textColor = {FyndColors.Green}      
            iconColor = {FyndColors.Green}/>
      {loadingAll ? (
        <Text style={styles.loadingText}>Loading list…</Text>

      ) : (
        <FlatList
          data={allItems}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={2}              // grid-style like your card layout
          columnWrapperStyle={styles.rowWrap}
          ListHeaderComponent={listHeader}
          contentContainerStyle={{ paddingBottom: 100 }} // to have some space below last cards above navi bar
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#333",
    margin: 20,
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
  },
  rowWrap: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
})
