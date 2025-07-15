// to display event card in biz profile
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import FyndColors from './fyndColors';

type Event = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl?: string;
};

type Props = {
  businessId: string;
};

const BizEventCard = ({ businessId }: Props) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Simulated fetch — replace with real API call
    const fetchEvents = async () => {
      try {
        // TODO: Replace this with real API call using businessId
        const data: Event[] = [
          {
            id: '1',
            title: 'STREET WEARE HOUSE',
            description: 'event description, location, time etc.',
            startDate: '2025-07-07',
            endDate: '2025-07-12',
            imageUrl: 'https://via.placeholder.com/150',
          },
        ];
        setEvents(data);
      } catch (error) {
        console.error('Error fetching business events:', error);
      }
    };

    fetchEvents();
  }, [businessId]);

  const renderItem = ({ item }: { item: Event }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>
          {formatDateRange(item.startDate, item.endDate)}
        </Text>
      </View>
    </View>
  );

  const formatDateRange = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    return `${s.getDate()}-${e.getDate()} ${e.toLocaleString('default', { month: 'short' }).toUpperCase()} ${e.getFullYear()}`;
  };

  return (
    <View style={{ paddingHorizontal: 16 }}>
    {events.map((item) => (
      <View key={item.id} style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.date}>
            {formatDateRange(item.startDate, item.endDate)}
          </Text>
        </View>
      </View>
    ))}
  </View>
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