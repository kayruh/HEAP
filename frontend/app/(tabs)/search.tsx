import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Pressable,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// search page 
export default function SearchScreen() {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState(['Dress', 'Collection', 'Nike']);
    const popularTerms = ['Trend', 'Dress', 'Bag', 'Tshirt', 'Beauty', 'Accessories'];

    const clearSearch = () => setSearchQuery('');

    const removeRecent = (itemToRemove: string) => {
        setRecentSearches(recentSearches.filter(item => item !== itemToRemove));
    };

    return (
        <View style={styles.container}>
            {/* Close Button */}
            <TouchableOpacity style={styles.closeIcon} 
            onPress={() => router.back()}> 
                <Ionicons name="close" size={20} color="black" />
            </TouchableOpacity>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color="#555" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search items"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor="#999"
                />
                {searchQuery !== '' && (
                    <TouchableOpacity onPress={clearSearch}>
                        <Ionicons name="close-outline" size={22} color="#555" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Recent Search */}
            <Text style={styles.sectionTitle}>Recent search</Text>
            <View style={styles.tagContainer}>
                {recentSearches.map(item => (
                    <View key={item} style={styles.tag}>
                        <Text style={styles.tagText}>{item}</Text>
                        <TouchableOpacity onPress={() => removeRecent(item)}>
                            <Ionicons name="close" size={12} color="#555" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* Popular Search Terms */}
            <Text style={styles.sectionTitle}>Popular search terms</Text>
            <FlatList
                data={popularTerms}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Text style={styles.popularItem}>{item}</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    closeIcon: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
        padding: 5, // increases tappable area
    },
    searchBar: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
        paddingBottom: 8,
        marginTop: 20, // ensures space after close icon
    },
    input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: '#000',
    },
    icon: {
        marginRight: 4,
    },
    sectionTitle: {
        marginTop: 24,
        marginBottom: 8,
        color: '#999',
        fontSize: 14,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        marginRight: 6,
        color: '#555',
        fontSize: 14,
    },
    popularItem: {
        fontSize: 16,
        paddingVertical: 6,
        color: '#111',
    },
});