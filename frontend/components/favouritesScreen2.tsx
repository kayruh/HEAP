import React, { useState, useEffect } from 'react'
import { View, Text, Image, FlatList, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import { useInteractionApi } from '@/api/interaction'
import FyndColors from './fyndColors'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

import DefaultImage from '../assets/FYND_default.png'
import { useBusinessApi } from '@/api/business'

const screenWidth = Dimensions.get('window').width
const CARD_WIDTH = (screenWidth - 48) / 2 // 2 cards + padding

// ----------------------
// FolderCard Component
// ----------------------
function FolderCard({ folder }: { folder: any }) {
  const { getBusinessImages } = useBusinessApi()
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImage = async () => {
      const firstBiz = folder.saved?.[0]
      if (firstBiz?.username) {
        try {
          const imgs = await getBusinessImages(firstBiz.username)
          if (imgs?.length > 0) {
            setCoverImage(imgs[0]) // take first image
          }
        } catch (err) {
          console.warn(`No image for business ${firstBiz.username}`, err)
        }
      }
      setLoading(false)
    }

    fetchImage()
  }, [folder])

  return (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      <TouchableOpacity onPress={() => router.push(`/(tabs)/folder/${folder.folder_name}`)}>
        {loading ? (
          <View style={[styles.image, styles.centered]}>
            <ActivityIndicator size="small" color={FyndColors.Purple} />
          </View>
        ) : (
          <Image
            source={coverImage ? { uri: coverImage } : DefaultImage}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <Text style={styles.title}>{folder.folder_name}</Text>
        <Text style={styles.description}>
          {folder.description ?? 'No description'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

// ----------------------
// Main Screen
// ----------------------
export default function FavouritesScreen() {
  const { user } = useUser()
  const { getAccountFolders } = useInteractionApi()

  const [folders, setFolders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    getAccountFolders()
      .then((raw: any[]) => {
        setFolders(raw) // keep raw data, FolderCard fetches image
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
      {folders.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>You have no lists yet.</Text>
        </View>
      ) : (
        <FlatList
          data={folders}
          keyExtractor={item => item.created_at + '_' + item.folder_name}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => <FolderCard folder={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    flex: 1,
  },
  columnWrapper: {
    gap: 16,
    marginBottom: 16,
    justifyContent: "flex-start",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
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
    paddingTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#444',
  },
})
