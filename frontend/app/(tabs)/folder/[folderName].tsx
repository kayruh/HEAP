import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert, TouchableOpacity, ActivityIndicator,} from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useInteractionApi } from '@/api/interaction';
import { Ionicons } from '@expo/vector-icons';
import FyndColors from '@/components/fyndColors';

export default function FavListScreen() {
  const { user } = useUser();
  const router = useRouter();
  const { folderName } = useLocalSearchParams(); // comes from [favList].tsx route param
  const { getAccountFolders, removeFromFolder, getFolderInfo} = useInteractionApi();

  const [folder, setFolder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!user) return;

  //   setLoading(true);
  //   getAccountFolders()
  //     .then((folders: any[]) => {
  //       const match = folders.find(f => f.folder_name === folderName);
  //       setFolder(match ?? null);
  //     })
  //     .catch(err => console.error('Failed to fetch folder:', err))
  //     .finally(() => setLoading(false));
  // }, [user, folderName]);


  useEffect(() => {
if (!user || !folderName) return;
setLoading(true);
    getFolderInfo(user.username as string, folderName as string)
      .then((data: any) => setFolder(data ?? null))
      .catch(err => console.error('Failed to fetch folder:', err))
      .finally(() => setLoading(false));
  }, [user, folderName]);

  const confirmDelete = (itemId: string) => {
    Alert.alert('Remove item?', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          if (!folderName) return;
          removeFromFolder(folderName as string, itemId)
            .then(() => {
              setFolder((prev: any) => ({
                ...prev,
                saved: prev.saved.filter((i: any) => i._id !== itemId),
              }));
            })
            .catch(err =>
              Alert.alert('Error', 'Failed to remove item: ' + err.message)
            );
        },
      },
    ]);
  };

  if (loading || !folder) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={FyndColors.Purple} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{folder.folder_name}</Text>
      <Text style={styles.description}>
        {folder.description ?? 'No description provided.'}
      </Text>

      <FlatList
        data={folder.saved}
        keyExtractor={(item: any) => item._id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image_url ?? 'https://via.placeholder.com/300' }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.info}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{item.name}</Text>
                <Ionicons
                  name={item.type === 'event' ? 'calendar' : 'storefront'}
                  size={18}
                  color={FyndColors.Purple}
                />
              </View>
              <Text style={styles.subtext}>{item.location ?? 'No location'}</Text>
            </View>

            <TouchableOpacity
              onPress={() => confirmDelete(item._id)}
              style={styles.removeBtn}
            >
              <Ionicons name="trash" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={{ fontSize: 16, color: '#444' }}>
              This folder has no saved items.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    paddingHorizontal: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 8,
  },
  subtext: {
    fontSize: 12,
    color: '#666',
  },
  removeBtn: {
    backgroundColor: '#e11d48',
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
