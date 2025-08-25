import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import FyndColors from './fyndColors';
import { useInteractionApi } from '@/api/interaction';

type ReviewCardProps = {
  username: string;
  reviewText: string;
  datePosted: string; // Format: YYYY-MM-DD or ISO string
  images?: string[]
};

const ReviewCard = ({ username, reviewText, datePosted, images=[]}: ReviewCardProps) => {
  const formattedDate = new Date(datePosted).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });


  return (
    <View style={styles.card}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.reviewText}>{reviewText}</Text>
      <Text style={styles.date}>{formattedDate}</Text>

      {images.length > 0 && (
        <FlatList
          data={images}
          horizontal
          keyExtractor={(uri, idx) => idx.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: 100, height: 100, borderRadius: 8, marginRight: 8 }}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: FyndColors.Green,
  },
  reviewText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default ReviewCard;