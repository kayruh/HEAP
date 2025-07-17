// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Pressable,} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import FyndColors from '@/components/fyndColors';

// export default function SearchScreen() {
//     const router = useRouter();

//     const [searchQuery, setSearchQuery] = useState('');
//     const [recentSearches, setRecentSearches] = useState(['Dress', 'Collection', 'Nike']);
//     const popularTerms = ['Trend', 'Dress', 'Bag', 'Tshirt', 'Beauty', 'Accessories'];

//     const clearSearch = () => setSearchQuery('');

//     const removeRecent = (itemToRemove: string) => {
//         setRecentSearches(recentSearches.filter(item => item !== itemToRemove));
//     };

//     return (
//         <View style={styles.container}>
//             {/* Close Button */}
//             <TouchableOpacity style={styles.closeIcon} 
//             onPress={() => router.back()}> 
//                 <Ionicons name="close" size={20} color={FyndColors.Green} />
//             </TouchableOpacity>

//             {/* Search Bar */}
//             <View style={styles.searchBar}>
//                 <Ionicons name="search-outline" size={20} color={FyndColors.Green} style={styles.icon} />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Search items"
//                     value={searchQuery}
//                     onChangeText={setSearchQuery}
//                     placeholderTextColor="#999"
//                 />
//                 {searchQuery !== '' && (
//                     <TouchableOpacity onPress={clearSearch}>
//                         <Ionicons name="close-outline" size={22} color={FyndColors.Green}/>
//                     </TouchableOpacity>
//                 )}
//             </View>

//             {/* Recent Search */}
//             <Text style={styles.sectionTitle}>Recent search</Text>
//             <View style={styles.tagContainer}>
//                 {recentSearches.map(item => (
//                     <View key={item} style={styles.tag}>
//                         <Text style={styles.tagText}>{item}</Text>
//                         <TouchableOpacity onPress={() => removeRecent(item)}>
//                             <Ionicons name="close" size={12} color="#fff"/>
//                         </TouchableOpacity>
//                     </View>
//                 ))}
//             </View>

//             {/* Popular Search Terms */}
//             <Text style={styles.sectionTitle}>Popular search terms</Text>
//             <FlatList
//                 data={popularTerms}
//                 keyExtractor={item => item}
//                 renderItem={({ item }) => (
//                     <Text style={styles.popularItem}>{item}</Text>
//                 )}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         paddingTop: 60,
//         paddingHorizontal: 20,
//         backgroundColor: FyndColors.Yellow,
//         flex: 1,
//     },
//     closeIcon: {
//         position: 'absolute',
//         top: 40,
//         left: 20,
//         zIndex: 10,
//         padding: 5, // increases tappable area
//     },
//     searchBar: {
//         flexDirection: 'row',
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//         alignItems: 'center',
//         paddingBottom: 8,
//         marginTop: 20, // ensures space after close icon
//     },
//     input: {
//         flex: 1,
//         marginLeft: 8,
//         fontSize: 16,
//         color: FyndColors.Green,
//         fontWeight:'500',
//     },
//     icon: {
//         marginRight: 4,
//     },
//     sectionTitle: {
//         marginTop: 24,
//         marginBottom: 8,
//         color: '#000',
//         fontSize: 14,
//     },
//     tagContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         gap: 8,
//     },
//     tag: {
//         flexDirection: 'row',
//         backgroundColor: FyndColors.Purple,
//         paddingVertical: 6,
//         paddingHorizontal: 10,
//         borderRadius: 20,
//         alignItems: 'center',
//         marginRight: 8,
//         marginBottom: 8,
//     },
//     tagText: {
//         marginRight: 6,
//         color: '#fff',
//         fontSize: 14,
//     },
//     popularItem: {
//         fontSize: 16,
//         paddingVertical: 6,
//         color: FyndColors.Green,
//         fontWeight:'600',
//     },
// });

/* app/(tabs)/search.tsx */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import FyndColors from '@/components/fyndColors';

import { useInteractionApi } from '@/api/interaction';

export default function SearchScreen() {
  const router = useRouter();
  const { searchProfile } = useInteractionApi();

  /* ────────── local state ────────── */
  const [searchQuery, setSearchQuery]   = useState('');
  const [recentSearches, setRecent]     = useState<string[]>([]); // 👈 start empty
  const popularTerms                    = ['Trend', 'Vintage', 'Cafe', 'Home', 'Local', 'Shopping'];

  const [results, setResults]           = useState<any[]>([]);
  const [loading, setLoading]           = useState(false);
  const [error,   setError]             = useState<Error | null>(null);

  /* ────────── debounce search ────────── */
  useEffect(() => {
    const timer = setTimeout(async () => {
      const q = searchQuery.trim();
      if (!q) {
        setResults([]);
        setLoading(false);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await searchProfile(q);
        setResults(data);

        // update recent list (no dups, cap at 6)
        setRecent(curr => {
          const existing = curr.filter(t => t.toLowerCase() !== q.toLowerCase());
          return [q, ...existing].slice(0, 6);
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }, 500);           // 500 ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  /* ────────── helpers ────────── */
  const clearSearch   = () => setSearchQuery('');
  const removeRecent  = (term: string) =>
    setRecent(recentSearches.filter(t => t !== term));

  const onPressResult = (username: string) =>
    router.push(`/profile/${username}`);      // adjust route if needed

  /* ────────── renderers ────────── */
  const renderResult = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.resultCard} onPress={() => onPressResult(item.username)}>
      <Image
        source={{ uri: item.cover_url ?? 'https://placehold.co/64x64' }}
        style={styles.resultImage}
      />
      <View style={styles.resultInfo}>
        <Text style={styles.resultName} numberOfLines={1}>
          {item.name || item.username}
        </Text>
        <Text style={styles.resultDesc} numberOfLines={2}>
          {item.description ?? 'No description'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  /* ────────── UI ────────── */
  const showResults = !!searchQuery.trim();

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeIcon} onPress={() => router.back()}>
        <Ionicons name="close" size={20} color={FyndColors.Green} />
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color={FyndColors.Green} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search businesses"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons name="close-outline" size={22} color={FyndColors.Green}/>
          </TouchableOpacity>
        )}
      </View>

      {/* Body */}
      {showResults ? (
        <>
          {loading && <ActivityIndicator style={{ marginTop: 24 }} color={FyndColors.Green} />}
          {error && <Text style={styles.error}>Error: {error.message}</Text>}
          {!loading && !error && results.length === 0 && (
            <Text style={styles.empty}>No businesses found</Text>
          )}

          <FlatList
            contentContainerStyle={{ paddingVertical: 16 }}
            data={results}
            keyExtractor={(item) => item.username}
            renderItem={renderResult}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <>
          {/* Recent Search (only if list not empty) */}
          {recentSearches.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Recent search</Text>
              <View style={styles.tagContainer}>
                {recentSearches.map(item => (
                  <View key={item} style={styles.tag}>
                    <Text style={styles.tagText}>{item}</Text>
                    <TouchableOpacity onPress={() => removeRecent(item)}>
                      <Ionicons name="close" size={12} color="#fff"/>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Popular Search Terms */}
          <Text style={styles.sectionTitle}>Popular search terms</Text>
          <FlatList
            data={popularTerms}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <Text style={styles.popularItem}>{item}</Text>
            )}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}

/* ────────── styles ────────── */
const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: FyndColors.Yellow,
    flex: 1,
  },
  closeIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 5,
  },
  searchBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    paddingBottom: 8,
    marginTop: 20,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: FyndColors.Green,
    fontWeight: '500',
  },
  icon: { marginRight: 4 },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 8,
    color: '#000',
    fontSize: 14,
  },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    flexDirection: 'row',
    backgroundColor: FyndColors.Purple,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: { marginRight: 6, color: '#fff', fontSize: 14 },
  popularItem: {
    fontSize: 16,
    paddingVertical: 6,
    color: FyndColors.Green,
    fontWeight: '600',
  },

  /* result list */
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  resultImage: { width: 64, height: 64, borderRadius: 8, marginRight: 12 },
  resultInfo: { flex: 1 },
  resultName: {
    color: FyndColors.Green,
    fontWeight: '700',
    marginBottom: 4,
  },
  resultDesc: { color: '#333', fontSize: 12 },

  empty:  { marginTop: 24, textAlign: 'center', color: '#333' },
  error:  { marginTop: 24, textAlign: 'center', color: 'red'  },
});
