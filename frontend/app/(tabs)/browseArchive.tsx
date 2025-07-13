import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { Dimensions } from "react-native";
import EventCarousel from '@/components/eventCarousel';
import EventCard from '@/components/eventCard';
import { StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import FyndBanner from '@/components/fyndBanner';
import FyndColors from '@/components/fyndColors'

import { useAppApi } from '@/api/app';
import { useEffect } from 'react';

export default function DebugWhatsHot() {
  const { getEventsBusiness } = useAppApi();

  useEffect(() => {
    // we wrap our await call in an async function
    async function fetchAndLog() {
      try {
        const data = await getEventsBusiness();
        console.log(data);
      } catch (err: any) {
        console.error('Failed to fetch hot items:', err);
      }
    }
    fetchAndLog();
  }, [getEventsBusiness]);
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CAROUSEL_ITEM_WIDTH = width * 0.85;


import { useState } from 'react';
import EventCarousel2,{ HotEvent } from '@/components/eventCarousel2';

function Browse() {
  const { getWhatsHot, getEventsBusiness } = useAppApi()
  const [hotEvents, setHotEvents] = useState<HotEvent[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const data = await getWhatsHot()
        const mapped: HotEvent[] = data.map((e: any) => ({
          id: e.uuid,
          title: e.title,
          business: e.business_username,
          pictures: e.pictures ?? [],
        }))
        setHotEvents(mapped)
      } catch (err) {
        console.error('Failed to load hot events', err)
      }
    })()
  }, [])

  return (
    <View style={styles2.container}>
      <StatusBar barStyle="dark-content" />
      <FyndBanner
        backgroundColor="#8B4789"
        textColor="#F0E68C"
        iconColor="#F0E68C"
      />
      <Text style={styles2.sectionTitle}>What's Hot</Text>
      {hotEvents.length > 0 ? (
        <EventCarousel2 data={hotEvents} />
      ) : (
        <Text style={styles2.loadingText}>Loading...</Text>
      )}
    </View>
  )
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    margin: 20,
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
  },
})