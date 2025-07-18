import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert, TouchableOpacity, ActivityIndicator,} from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useInteractionApi } from '@/api/interaction';
import { Ionicons } from '@expo/vector-icons';
import FyndColors from '@/components/fyndColors';
import { useClerkApi } from '@/api/clerk';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function FavListScreen() {
  const { user } = useUser();
  const router = useRouter();
  const { folderName } = useLocalSearchParams(); // comes from [favList].tsx route param
  const { getFolderInfo, updateFolder} = useInteractionApi();
  const { getAvatar } = useClerkApi();

  const [folder, setFolder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatars, setAvatars] = useState<Record<string, string>>({});


  useEffect(() => {
  if (!user || !folderName) return;

  setLoading(true);

  (async () => {
    try {
      const data = await getFolderInfo(
        user.username as string,
        folderName as string
      );
      setFolder(data ?? null);
    } catch (err) {
      console.error('Failed to fetch folder:', err);
    } finally {
      setLoading(false);
    }
  })();
}, [user, folderName]);

// for avatars

  useEffect(() => {
  if (!folder || !folder.saved?.length) return;
  const usernamesToFetch = folder.saved.filter(u => !avatars[u]);

  if (!usernamesToFetch.length) return;

  (async () => {
    try {
      const entries = await Promise.all(
        usernamesToFetch.map(async username => {
          const url = await getAvatar(username);             // ✅ string | null
          return [username, url] as const;
        })
      );
      setAvatars(prev => Object.fromEntries([...Object.entries(prev), ...entries]));
    } catch (err) {
      console.error('Failed to fetch avatar(s):', err);
    }
  })();
}, [folder?.saved]);

  const confirmDelete = (item: string) => {
  Alert.alert('Remove item?', 'Are you sure you want to remove this item?', [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Remove',
      style: 'destructive',
      onPress: async () => {
        if (!folder) return;
        const { saved } = folder
        const newSaved = saved.filter((u: string) => u !== item);
        try {
          // 🚀 call /interaction/updateFolder
          await updateFolder(folder.folder_name, newSaved, folder.description ?? '');

          // keep UI in sync
          setFolder({ ...folder, saved: newSaved });
        } catch (err: any) {
          console.error(err);
          Alert.alert('Error', err?.response?.data?.error ?? 'Failed to update list.');
        }
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
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back() }>
        <Ionicons name="chevron-back" size={22} color={FyndColors.Purple}/>
      </TouchableOpacity>

      <Text style={styles.header}>{folder.folder_name}</Text>
      <Text style={styles.description}>
        {folder.description ?? 'No description provided.'}
      </Text>

      <FlatList
        data={folder.saved}
        // keyExtractor={(item: any) => item._id}
        keyExtractor={(item) => item}
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
                <Image
                  style={styles.avatar}
                  source={{ uri: avatars[item] || 'https://placehold.co/24x24' }}
                />
                <Text style={styles.title}>@{item}</Text>
                <Ionicons
                  name={item.type === 'event' ? 'calendar' : 'storefront'}
                  size={18}
                  color={FyndColors.Purple}
                />
              </View>
              <Text style={styles.subtext}>{item.location ?? 'No location'}</Text>
            </View>

            <TouchableOpacity
              onPress={() => confirmDelete(item)}
              style={styles.removeBtn}
            >
              <Ionicons name="trash" size={15} color="white" />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
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
    padding: 7,
    marginRight: 10,
    borderRadius: 8,
    bottom: 7,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
  width: 24,
  height: 24,
  borderRadius: 12,
  marginRight: 6,
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
});
