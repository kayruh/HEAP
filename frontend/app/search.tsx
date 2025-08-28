
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import FyndColors from '@/components/fyndColors';

// import { useInteractionApi } from '@/api/interaction';
// import { useClerkApi } from '@/api/clerk';

// export default function SearchScreen() {
//   const router = useRouter();
//   const { searchProfile } = useInteractionApi();
//   const { getAvatar } = useClerkApi()
//   /* ────────── local state ────────── */
//   const [searchQuery, setSearchQuery]   = useState('');
//   const [recentSearches, setRecent]     = useState<string[]>([]); 
//   const popularTerms                    = ['Trend', 'Vintage', 'Cafe', 'Home', 'Local', 'Shopping'];

//   const [results, setResults]           = useState<any[]>([]);
//   const [loading, setLoading]           = useState(false);
//   const [error,   setError]             = useState<Error | null>(null);
//   const [avatars, setAvatars]           = useState<Record<string,string>>({});

//   /* ────────── debounce search ────────── */
//   useEffect(() => {
//     const timer = setTimeout(async () => {
//       const q = searchQuery.trim();
//       if (!q) {
//         setResults([]);
//         setLoading(false);
//         setError(null);
//         return;
//       }

//       try {
//         setLoading(true);
//         setError(null);

//         const data = await searchProfile(q);
//         setResults(data);

        

//         // update recent list (no dups, cap at 6)
//         setRecent(curr => {
//           const existing = curr.filter(t => t.toLowerCase() !== q.toLowerCase());
//           return [q, ...existing].slice(0, 6);
//         });
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     }, 500);           // 500 ms debounce

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   /* ────────── helpers ────────── */
//   const clearSearch   = () => setSearchQuery('');
//   const removeRecent  = (term: string) =>
//     setRecent(recentSearches.filter(t => t !== term));

//   const onPressResult = (username: string) =>
//     router.push(`/(searchProfile)/${username}`);     

//   /* ────────── renderers ────────── */
//   const renderResult = ({ item }: { item: any }) => (

//     <TouchableOpacity style={styles.resultCard} onPress={() => onPressResult(item.username)}>
//       <Image
//         source={{ uri: item.cover_url ?? 'https://placehold.co/64x64' }}
//         style={styles.resultImage}
//       />
//       <View style={styles.resultInfo}>
//         <Text style={styles.resultName} numberOfLines={1}>
//           {item.name || item.username}
//         </Text>
//         <Text style={styles.resultDesc} numberOfLines={2}>
//           {item.description ?? 'No description'}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

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
import { useClerkApi }       from '@/api/clerk';     // ⬅️ already imported

export default function SearchScreen() {
  const router = useRouter();
  const { searchProfile } = useInteractionApi();
  const { getAvatar }     = useClerkApi();           // ⬅️ will use below

  /* ────────── local state ────────── */
  const [searchQuery, setSearchQuery]   = useState('');
  const [recentSearches, setRecent]     = useState<string[]>([]);
  const popularTerms                    = ['Trend', 'Vintage', 'Cafe', 'Home', 'Local', 'Shopping'];

  const [results, setResults]           = useState<any[]>([]);
  const [loading, setLoading]           = useState(false);
  const [error,   setError]             = useState<Error | null>(null);
  const [avatars, setAvatars]           = useState<Record<string, string>>({}); // 🆕

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

        // 🆕  fetch avatars for usernames we don't have yet
        const missing = data
          .map((b: any) => b.username)
          .filter(u => !avatars[u]);

        if (missing.length) {
          const fetched = await Promise.all(
            missing.map(async u => {
              try {
                const url = await getAvatar(u);
                return { u, url };
              } catch {
                return { u, url: null };
              }
            })
          );
          setAvatars(prev => {
            const next = { ...prev };
            fetched.forEach(({ u, url }) => { if (url) next[u] = url; });
            return next;
          });
        }

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
    }, 500); // debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  /* ────────── helpers ────────── */
  const clearSearch   = () => setSearchQuery('');
  const removeRecent  = (term: string) =>
    setRecent(recentSearches.filter(t => t !== term));

  const onPressResult = (username: string) =>
    router.push(`/(tabs)/searchProfile/${username}`);

  /* ────────── renderers ────────── */
  const renderResult = ({ item }: { item: any }) => {

    const imgUri =
    avatars[item.username] ||            // avatar (if fetched)
    item.cover_url         ||            // cover image
    'https://placehold.co/64x64';        // fallback

  console.log('[Search] imgUri for', item.username, '→', imgUri);
    
    return (
    <TouchableOpacity style={styles.resultCard} onPress={() => onPressResult(item.username)}>
      <Image
        source={{
          uri:
            avatars[item.username] ||                // 🆕 avatar first
            item.cover_url        ||                 // then cover
            'https://placehold.co/64x64',            // fallback
        }}
        style={styles.resultImage}
      />
      <>{console.log()}</>
      <View style={styles.resultInfo}>
        <Text style={styles.resultName} numberOfLines={1}>
          {item.name || item.username}
        </Text>
        <Text style={styles.resultDesc} numberOfLines={2}>
          {item.description ?? 'No description'}
        </Text>
      </View>
    </TouchableOpacity>
  );};

  /* ────────── UI ────────── */
  const showResults = !!searchQuery.trim();

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeIcon} onPress={() => router.back()}>
        <Ionicons name="close" size={20} color={FyndColors.Green} />
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.logoContainer}>
          <Image
            source={require('../assets/FYND_logo/purple.png')}
            style={styles.logo}/>
      </View>
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
              <TouchableOpacity
                key={item}
                style={styles.tag}
                onPress={() => setSearchQuery(item)}   // 👈 fill search bar
              >
                <Text style={styles.tagText}>{item}</Text>

                {/* stopPropagation so “×” doesn’t trigger outer onPress */}
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    removeRecent(item);
                  }}
                >
                  <Ionicons name="close" size={12} color="#fff"/>
                </TouchableOpacity>
              </TouchableOpacity>
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
                <TouchableOpacity onPress={() => setSearchQuery(item)}>
                <Text style={styles.popularItem}>{item}</Text>
                </TouchableOpacity>
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
    paddingTop: 100,
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

  logoContainer: {
    alignItems: 'center',
    marginBottom: 5,
    paddingLeft: 20,
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },
});
