import { View, Text,StyleSheet, Platform, StatusBar } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'

export default function FyndBanner() {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('settings')}>
                    <Ionicons name="menu" size={28} color="#a84c3a" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>FYND</Text>

                <TouchableOpacity onPress={() => navigation.navigate('search')}>
                    <Ionicons name="search" size={24} color="#a84c3a" />
                </TouchableOpacity>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#ffff',
    },
    header: {
        backgroundColor: '#6E1725',
        paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight || 30,
        paddingBottom: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        color: '#a84c3a',
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 2,
        paddingTop: 2,
    },
    browse_header: { // if want browse header to be diff colour (take out styling in this file)
        // style in individual page itself, put style sheet in
        backgroundColor: '#AFAB23',
        paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight || 30,
        paddingBottom: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    browse_headerTitle: {
        color: '#2B2B23',
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
})