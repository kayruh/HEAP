// to display event card in biz profile
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import FyndColors from './fyndColors';
import { useBusinessApi } from '@/api/business';
import { useRouter } from 'expo-router';

export type Event = {
  uuid:        string;          // ← matches DB
  title:       string | null;
  description: string | null;
  start:       string | null;   // ISO timestamp
  end:         string | null;   // ISO timestamp
  imageUrl?:   string | null;   // we’ll add this client-side
};

type Props = {
  username: string;
};


const BizEventCard = ({ username }: Props) => {
  const { getEvents, getEventImages } = useBusinessApi();
  const router = useRouter()
  const [events, setEvents]           = useState<Event[]>([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    if (!username) return;

    (async () => {
      try {

        const { getEvents: rows } = await getEvents(username);   // <-- unwrap

        const enriched = await Promise.all(
          (rows ?? []).map(async (ev: any) => {
            const imgs   = await getEventImages(ev.uuid);        // string[]
            const cover  = imgs?.[0] ?? null;                    // pick 1st
            return {                                           // normalise
              uuid:  ev.uuid,
              title: ev.title,
              description: ev.description,
              start: ev.start,
              end:   ev.end,
              imageUrl: cover,
            } as Event;
          })
        );

        setEvents(enriched);
      } catch (err) {
        console.error('Error fetching business events:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);


  const fmt = (iso: string) => {
  const d = new Date(iso);
  const day   = d.getDate();
  const month = d.toLocaleString('default', { month: 'short' }).toUpperCase();
  const year  = d.getFullYear();
  return `${day} ${month} ${year}`;
};

const formatDateLabel = (start?: string | null, end?: string | null) => {
  if (!start && !end) return '';                    // no dates
  if (start && !end) return `Starts on ${fmt(start)}`;
  if (!start && end)  return `Ends on ${fmt(end)}`;
  // both present → range
  return `${new Date(start!).getDate()}-${new Date(end!).getDate()} ${
    new Date(end!).toLocaleString('default', { month: 'short' }).toUpperCase()
  } ${new Date(end!).getFullYear()}`;
};

  console.log(events)
  console.log()

  if (loading) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading…</Text>;
  }

  if (!events.length) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>No events yet</Text>;
  }

  return (

     <FlatList
       data={events}
       keyExtractor={(item) => item.uuid}
       contentContainerStyle={{ paddingHorizontal: 16 }}
       renderItem={({ item }) => (
         <TouchableOpacity
           activeOpacity={0.8}
           onPress={() => router.push(`../events/${item.uuid}`)} 
           style={styles.card}
         >
          <Image
            source={{
              uri: item.imageUrl ?? 'https://placehold.co/80x80?text=No+Image',
            }}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.title}>{item.title ?? 'Untitled event'}</Text>
            <Text style={styles.description}>
              {item.description ?? 'No description'}
            </Text>
            <Text style={styles.date}>
              {formatDateLabel(item.start, item.end)}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};


const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B2635',
  },
});

export default BizEventCard;