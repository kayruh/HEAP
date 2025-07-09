import { View, Text,StyleSheet, Platform, StatusBar } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

// diff colours for each page?? how?

const Green = '#556B2F';
const Yellow = '#F0E68C';
const Purple = '#8B4789';
const Grey = '#708090';

export default function FyndBanner() {
    const router = useRouter();

  return (
    <View style={styles.container}>
        <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/settings')}>
                    <Ionicons name="menu" size={28} color="#F0E68C"/>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>FYND</Text>

                <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
                    <Ionicons name="search" size={24} color="#F0E68C"/>
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
        backgroundColor: Green,
        paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight || 30,
        paddingBottom: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        color: Yellow,
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 2,
        paddingTop: 2,
    },
    // homeColour:{
    //     backgroundColor:'#6E1725',
    // },
    // homeText:{
    //     color: '#a84c3a',
    // },
    // browseColour: {
    //     backgroundColor:'#AFAB23',
    // },
    // browseText: {
    //     color:'#2B2B23',
    // } // diff colour for diff pages????
})