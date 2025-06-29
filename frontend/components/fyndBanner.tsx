import { View, Text,StyleSheet, Platform, StatusBar } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRouter } from 'expo-router'

export default function FyndBanner() {
    const router = useRouter();

  return (
    <View style={styles.container}>
        <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('settings')}>
                    <Ionicons name="menu" size={28} color="#a84c3a" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>FYND</Text>

                <TouchableOpacity onPress={() => router.push('search')}>
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
        backgroundColor:'#6E1725',
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
    homeColour:{
        backgroundColor:'#6E1725',
    },
    homeText:{
        color: '#a84c3a',
    },
    browseColour: {
        backgroundColor:'#AFAB23',
    },
    browseText: {
        color:'#2B2B23',
    } // diff colour for diff pages????
})