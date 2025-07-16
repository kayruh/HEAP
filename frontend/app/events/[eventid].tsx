// EVENT
// if event -> bring them to event card, 
// if biz bring them to biz profile (searchprofile)/[username] when pressed

import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import FyndColors from '@/components/fyndColors'
import { SafeAreaView } from 'react-native'
import { useUser } from '@clerk/clerk-expo'
// import { useBusinessApi } from '@/api/business'
import { useInteractionApi } from '@/api/interaction'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'


export default function EventIdScreen() {
  const { getEventInfo } = useInteractionApi()
  const { user } = useUser();
  // Tell TypeScript what param we expect from the route.
  const { eventid } = useLocalSearchParams<{ eventid: string }>();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

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
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color={FyndColors.Purple}/>
      </TouchableOpacity>

      <ScrollView>
        <Image source={{ uri: event.event_photos }} style={styles.image} />

        <Text style={styles.title}>{event.title}</Text>

        {/* link the username to the biz profile page (for users to view) */}
        <Text style={styles.hosted}>Hosted by @{event.username}</Text>

        {/* if no start OR end date dont display this section at all */}
        <View>
          <Text style={styles.hosted}>
          <Ionicons name='calendar' size={16} color={FyndColors.Purple}/>
          {event.start}-{event.end}
          </Text>
        </View>

        {/* if no address dont display this section at all */}
        {/* Link address to goole maps location ?? */}
        <View>
          <Text style={styles.hosted}>
          <Ionicons name='location' size={16} color={FyndColors.Purple}/>
          {event.Address} address placeholder
          </Text>
        </View>

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
    fontSize: 24,
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
    color: '#000',
    marginBottom: 10,
  },
  dateBadge: {
    backgroundColor: FyndColors.Yellow,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  backButton: {
    position: 'absolute',
    top: 55,
    left: 15,
    // circle ard button:
      // backgroundColor: FyndColors.Yellow,
      // borderRadius: 20,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 10,
  },
})
