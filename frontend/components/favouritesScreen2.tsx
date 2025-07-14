import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import { useInteractionApi } from '@/api/interaction'
import FyndColors from './fyndColors'

const screenWidth = Dimensions.get('window').width
const CARD_WIDTH = (screenWidth - 48) / 2 // 2 cards + padding

export default function FavouritesScreen() {
  const { user } = useUser()
  const { getAccountFolders } = useInteractionApi()

  const [folders, setFolders] = useState<
    Array<{
      id: string
      title: string
      description: string | null
      image: string
    }>
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    getAccountFolders()
      .then((raw: any[]) => {
        // raw === [{ username, created_at, folder_name, saved: [...], description }, …]
        const mapped = raw.map(folder => ({
          id: folder.created_at + '_' + folder.folder_name,
          title: folder.folder_name,
          description: folder.description,
          // for now pick the first saved item's image_url, or a placeholder
          image:
            folder.saved?.[0]?.image_url ??
            'https://via.placeholder.com/150',
        }))
        setFolders(mapped)
      })
      .catch(err => console.error('fetch folders failed', err))
      .finally(() => setLoading(false))
  }, [user])

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={FyndColors.Purple} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favourites ★</Text>

      {folders.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>You have no lists yet.</Text>
        </View>
      ) : (
        <FlatList
          data={folders}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <View style={[styles.card, { width: CARD_WIDTH }]}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>
                {item.description ?? 'No description'}
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 20,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 8,
  },
  description: {
    fontSize: 12,
    color: '#6b7280',
    padding: 8,
    paddingTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#444',
  },
})