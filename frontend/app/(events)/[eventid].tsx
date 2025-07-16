// EVENT
// if event -> bring them to event card, 
// if biz bring them to biz profile (searchprofile)/[username] when pressed

import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import FyndColors from '@/components/fyndColors'
import { SafeAreaView } from 'react-native'
import { useUser } from '@clerk/clerk-expo'
// import { useBusinessApi } from '@/api/business'
import { useInteractionApi } from '@/api/interaction'


export default function EventIdScreen() {
  const { getEventInfo } = useInteractionApi()
  const { user } = useUser();
  // Tell TypeScript what param we expect from the route.
  const { eventid } = useLocalSearchParams<{ eventid: string }>();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof eventid === 'string') {
      (async () => {
        try {
          const data = await getEventInfo(eventid); // real API call
          console.log(data)
          setEvent(data);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false); // param missing or not a string
    }
  }, [eventid]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={FyndColors.Green} />
        <Text style={{ marginTop: 10, color:'black' }}>Loading event…</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: event.picture }} style={styles.image} />

        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.hosted}>Hosted by @{event.business_username}</Text>

        <Text style={styles.description}>{event.description}</Text>

        <Text>Photo carousel ??</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: FyndColors.Green,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    marginTop: 10,
  },
  hosted: {
    fontSize: 14,
    color: '#666',
  },
})
